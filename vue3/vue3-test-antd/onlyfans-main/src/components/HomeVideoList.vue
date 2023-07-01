<template>
	<div class="box">
		<div v-for="(parent, y) in data.videoList" :key="y">
			<div class="title">{{ parent.title }}</div>
			<div v-if="parent.vlist && parent.vlist.length % 2 == 0">
				<div class="small_box">
					<div class="small_item" v-for="(item, index) in parent.vlist" :key="index" @click="toPlay(item)">
						<div class="small_col">
							<Image class="small_img" :src="item.icon" radius="8" :show-loading="true">
								<template v-slot:loading>
									<Loading type="spinner" size="20" />
								</template>
							</Image>
							<div class="van-ellipsis video_name">{{ item.name }}</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="small_box">
				<div class="big_col">
					<Image fit="scale-down" class="big_img" :src="parent.vlist[0].icon" radius="8" :show-loading="true"
						:show-error="true" :loading-icon="videoFace" :error-icon="videoFace">
						<template v-slot:loading>
							<!-- <Loading type="spinner" size="20" /> -->
							<img :src="videoFace" />
						</template>
					</Image>
					<div class="van-ellipsis video_name">{{ parent.vlist[0].name }}</div>
				</div>
				<div v-for="(item, index) in getNewArray(parent.vlist)" :key="index" class="small_row">
					<div class="big_col">
						<Image class="big_img" :src="item.icon" radius="8" :show-loading="true" :show-error="true"
							:loading-icon="videoFace" :error-icon="videoFace">
							<template v-slot:loading>
								<Loading type="spinner" size="20" />
							</template>
						</Image>
						<div class="van-ellipsis video_name">{{ item.name }}</div>
					</div>
				</div>
			</div>

			<div v-if="parent.vtype == 0">
				<Row class="footer">
					<Col class="btn_box left">
					<Image class="icon_play" :src="iconPlay" />
					<span class="text_play">看更多影片</span>
					</Col>
					<Col class="btn_box" @click="toNextList(y)">
					<Image class="icon_change right" :src="iconChange">
						<template v-slot:loading>
							<Loading type="spinner" size="20" />
						</template>
					</Image>
					<span class="text_change">换一批</span>
					</Col>
				</Row>
			</div>
			<div v-else>
				<Row class="footer">
					<Col class="btn_box_long">
					<Image class="icon_play" :src="iconPlay">
						<template v-slot:loading>
							<Loading type="spinner" size="20" />
						</template>
					</Image>
					<span class="text_play">看更多影片</span>
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Image,
		Col,
		Row,
		Toast,
		Loading
	} from "vant";
	import {
		computed,
		reactive,
		ref
	} from "@vue/reactivity";
	import {
		useSlots,
		watch
	} from "vue";
	import Log from "@common/Log.js";
	import {
		getImage
	} from "@axios/ImageGet";
	import videoFace from "@assets/video_face.png";
	import {
		mapState,
		useStore
	} from "vuex";
	import iconPlay from "@assets/main/icon_play.png";
	import iconChange from "@assets/main/icon_change.png";
	import {
		changeNextList
	} from "@axios/Api.js";

	import {
		useRouter
	} from "vue-router";

	export default {
		name: "最近上新及其他类型",
		components: {
			Image,
			Col,
			Row,
			Toast,
			Loading,
		},
		setup(props, context) {
			let store = useStore();

			const router = useRouter();

			const data = reactive({
				videoList: store.state.homeVideoList,
				vList: [],
			});

			// 1-4 数据作为小图
			const formatVideoList = (list) => {
				// console.log("list", list);
				if (list && list.length > 0) {
					list.forEach((element) => {
						// console.log(element);
						if (element.vlist && element.vlist.length > 0) {
							element.vlist.forEach((item) => {
								getImage(item.img).then((res) => {
									item.icon = res.data;
									// Log(" data.vlist=" + JSON.stringify(vList));
								});
							});
						}
					});
				}
			};

			// computed(newArray = (list) => {
			//   let arr = list
			//   arr.shit()
			//   return arr
			// })

			const getNewArray = (list) => {
				if (list) {
					let arr = [];
					list.forEach((el) => {
						arr.push(el);
					});
					arr.shift();
					return arr;
				} else {
					return [];
				}
			};

			watch(
				() => store.state.homeVideoList,
				(val, old) => {
					if (val && val.length > 0) {
						data.videoList = val;
						// console.log("数据变化");
						// console.log(" data.videoList==", data.videoList);
						// formatVideoList(data.videoList)
					}
				}
			);

			watch(
				() => store.state.homeVideoList.vlist,
				(val, old) => {
					if (val && val.length > 0) {
						// formatVideoList(val)
					}
				}
			);

			const toNextList = (index) => {
				if (store.state.isPullRefresh) {
					store.commit("updatePullRefresh", false);
				}
				changeNextList({
						sid: data.videoList[index].sid,
					})
					.then((res) => {
						if (res.code == 0 && res.data && res.data.length > 0) {
							let list = res.data;
							if (list && list.length > 0) {
								list.forEach((element, x) => {
									// console.log(element);
									getImage(element.img).then((resp) => {
										data.videoList[index].vlist[x] = list[x];
										data.videoList[index].vlist[x].icon = resp;
									});
								});
							}
						}
					})
					.catch((err) => {});
			};

			const toPlay = (item) => {
				router.push("/videoListActivity");
			}

			return {
				Log,
				getImage,
				videoFace,
				formatVideoList,
				data,
				iconPlay,
				iconChange,
				changeNextList,
				toNextList,
				getNewArray,
				toPlay
			};
		},
		created() {},
		mounted() {
			window.addEventListener("scroll", function() {
				// console.log('scroll==', document.body.scrollTop);
			})
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		overflow-x: hidden;

		.title {
			margin-top: 8px;
			width: 100%;
			display: flex;
			justify-content: start;
			padding-left: 8px;
			font-size: 16px;
			font-weight: bold;
		}

		.footer {
			width: 100%;
			display: flex;
			height: 40px;
			margin-top: 10px;
			justify-content: center;

			.btn_box {
				display: flex;
				justify-content: center;
				align-items: center;
				background: #f0f5f9;
				border-radius: 4px;
				width: 48%;

				.icon_play,
				.icon_change {
					width: 24px;
					height: 24px;
				}

				.text_play,
				.text_change {
					font-size: 14px;
				}
			}

			.btn_box_long {
				display: flex;
				justify-content: center;
				align-items: center;
				background: #f0f5f9;
				border-radius: 4px;
				width: 96%;

				.icon_play,
				.icon_change {
					width: 24px;
					height: 24px;
				}

				.text_play,
				.text_change {
					font-size: 14px;
				}
			}

			.left {
				margin-right: 5px;
			}

			.right {
				margin-left: 5px;
			}
		}

		.big_col {
			margin-top: 8px;
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;

			.big_img {
				width: 98%;
			}

			.video_name {
				width: 96%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: start;
				font-size: 14px;
				font-weight: bold;
			}
		}

		.small_box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			.small_row {
				margin-top: 8px;
				width: 50%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.small_img {
					width: 97%;
					display: flex;
				}

				.video_name {
					width: 97%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: start;
				}
			}

			.small_item {
				width: 50%;
				justify-content: center;
				display: flex;

				.small_col {
					margin-top: 8px;
					width: 100%;
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;

					.small_img {
						width: 97%;
						display: flex;
					}

					.video_name {
						width: 97%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: start;
					}
				}
			}
		}
	}
</style>
