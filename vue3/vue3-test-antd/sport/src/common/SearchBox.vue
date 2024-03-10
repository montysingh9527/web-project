<template>
    <div class="search-box flex-between">
        <div class="search center" @click="search">
            <i class="iconfont iconsousuo mu-primary-text-color"></i>
        </div>
        <input ref="query" type="search" :disabled="disabled" v-model="query" class="box" :placeholder="placeholder"/>
        <i @click="clear" v-show="query" class="iconfont iconguanbi1 fs20 p-r5 p-l5"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    import {debounce} from '../assets/js/util'

    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            },
            delay: {
                type: Number,
                default: 200
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                query: ''
            }
        },
        methods: {
            clear() {
                this.query = ''
            },
            setQuery(query) {
                this.query = query
            },
            blur() {
                this.$refs.query.blur()
            },
            search() {
                if (this.query) {
                    this.$emit('query', this.query)
                }
            }
        },
        created() {
            this.$watch('query', debounce((newQuery) => {
                this.$emit('query', newQuery)
            }, this.delay))
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .search-box {
        height: 1.75rem;
        overflow: hidden;
        border-radius: 0.2rem;
        background-color: #fff;
        display: flex;
        .search {
            width: 1.75rem;
            line-height: 1.75rem;
            background: #ddd;

            .iconfont {
                font-size: 1.2rem;
            }
        }

        .box {
            flex: 1;
            border: 0;
            margin-right: 0.25rem;
            line-height: 1.5rem;
            padding-left: 0.25rem;
            color: #333;
            font-size: 0.8rem;

            &::placeholder {
                color: #90a4ae;
                font-size: 0.6rem;
            }
        }

        .delete {
            font-size: 1rem;
            padding-bottom: 0.15rem;
        }

    }
</style>
