const loading1 = ref(false)
const finished1 = ref(false)
const params1 = reactive({
    limit: 20,
    page: 1,
    type: 1 //1视频/2图文
})
const getData1 = () => {
    loading1.value = true
    if (queryId.value) {
        params1.id = queryId.value
        apiArticleList(params1)
            .then((res) => {
                loading1.value = false
                console.log(res)
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                    if (res.result.records && res.result.records.length > 0) {
                        // setTimeout(() => {
                        if (params1.page === 1) {
                            state.data = res.result.records
                        } else {
                            state.data = [...state.data, ...res.result.records] //无线加载新数据
                        }
                        // }, 4000)
                    }

                    finished1.value = params1.page >= res.result.pages
                }
            })
            .catch(() => {})
    } else {
        apiArticleListMy(params1)
            .then((res) => {
                loading1.value = false
                console.log(res)
                if (res.code !== 0) {
                    showFailToast(res.message)
                } else {
                    if (res.result.records && res.result.records.length > 0) {
                        // setTimeout(() => {
                        if (params1.page === 1) {
                            state.data = res.result.records
                        } else {
                            state.data = [...state.data, ...res.result.records] //无线加载新数据
                        }
                        // }, 4000)
                    }

                    finished1.value = params1.page >= res.result.pages
                }
            })
            .catch(() => {})
    }
}
// 刷新
const onRefresh1 = async () => {
    params1.page = 1
    await getData1(params1)
}
// 无限加载
const onLoad1 = async () => {
    params1.page += 1
    // console.log(params1.page)
    await getData1(params1)
}
