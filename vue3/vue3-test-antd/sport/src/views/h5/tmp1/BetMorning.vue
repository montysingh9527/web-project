<template>
    <div class="h5-bet-morning">
        <bet-common :league-id="league_id" :match-id="match_id"></bet-common>
    </div>
</template>
<script>
    import BetCommon from "../../../components/BetCommon";

    export default {
        data() {
            return {
                match_id: '',
                league_id: '',
            }
        },

        components: {
            BetCommon
        },

        beforeRouteEnter(to, from, next) {
            console.log('query--------------->', to.query)
            next(vm => {
                vm.league_id = to.query.league_id
                vm.match_id = to.query.match_id
            })
        }
    }
</script>
<style type="text/css" lang="less" scoped>
    .h5-bet-morning {

    }
</style>
