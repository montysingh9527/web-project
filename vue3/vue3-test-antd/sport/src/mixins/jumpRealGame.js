import Event from "../event";
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters(['userInfo']),
    },
    methods: {
        // 1级跳转
        jumpGame(game) {
            if (!this.userInfo.userId) {
                this.$toast(this.$t('login_f'))
                Event.$emit('show-login')
                return;
            }

            const p = window.innerWidth < 768 ? '1' : '0';

            const host = process.env.NODE_ENV === 'development' ? 'http://t061f.fhptdev.com' : window.location.origin;

            // h5: /mobile/#/lottery/index/70
            // pc: /index3.php?id=70
            // 如果是彩票
            let url = host + `/mobile/#/lottery/index/${game.gameId}`;

            // pc
            if (p === '0') {
                url = host + `/index3.php?id=${game.gameId}`;
            }

            // 如果不是彩票游戏
            if (!game.gameType) {
                url = host + `/mobile/real/goToGame/${game.gameId}/${p}/`;
            }

            const windows = window.open(url, '_black')
        },

        // 2级跳转
        // 二级子类游戏跳转
        jumpSubGame(game, subGame) {
            if (!this.userInfo.userId) {
                Event.$emit('show-login')
                return;
            }
            console.log('jumpSubGame game==', game)
            console.log('jumpSubGame subGame==', subGame)

            const p = window.innerWidth < 768 ? '1' : '0';

            const host = process.env.NODE_ENV === 'development' ? 'http://t061f.fhptdev.com' : window.location.origin;

            const url = host + `/mobile/real/goToGame/${game.gameId}/${p}/${subGame.gameId}`;
            const windows = window.open(url, '_black')
        },
    }
}
