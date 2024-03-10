import {mapGetters, mapMutations} from "vuex";

export default {
    computed: {
        ...mapGetters(['bets']),

        betKeys() {
            return Object.keys(this.bets)
        }
    },
    methods: {
        ...mapMutations({
            updateBet: 'UPDATE_BET',
            deleteBet: 'DELETE_BET'
        }),

        /**
         * @params 联赛, 比赛, 玩法组, 玩法
         **/
        _chooseBet(play = {}, market_groups = {}, match = {}) {
            let match_id = match.id || match.match_id
            if (play.is_show !== '1' || play.is_suspend !== '0' || !match_id) {
                return;
            } else if(play.is_allow_bet === 0 && play.isFBD == '1') {
                this.$toast(this.$t('s_b'))
                return;
            }

            let key = `${match_id}-${play.market_id}`

            console.log('key========', key);

            const bet = {
                ...play,
                title: this.betTitle(play, market_groups, match),
                match_id: match_id,
                status: match.status,
                sport_id: match.sport_id,
                market_name: market_groups.name + '  ' + this.subGroupName(play),
                bet_info: market_groups.code === 'full_time_result' ? play.header : play.handicap,
                group_code: market_groups.code,
                home_name: match.home_name,
                away_name: match.away_name,
                signId: key
            }

            // 包含就删除 否则添加
            if (this.betKeys.includes(key)) {
                this.deleteBet(key)
            } else {
                this.updateBet({key, bet})
            }
        },

        // 针对二级注单
        subGroupName(play) {
            let name = play.name
            if (name === 'Spread') {
                return this.$t('r_f')
            } else if (name === 'Total') {
                return this.$t('z_f')
            } else if (name === 'Money Line') {
                return this.$t('game_lines_money_line')
            } else if (name === 'to_win') {
                return this.$t('winner')
            } else if (name === 'total_points') {
                return this.$t('z_f')
            } else if (name === 'handicap_sets') {
                return this.$t('r_f')
            } else if (name === 'run_line') {
                return this.$t('r_l')
            } else if (name === 'total_points') {
                return this.$t('z_f')
            } else if (name === 'money_line') {
                return this.$t('q_r_p')
            } else if (name === 'match_handicap') {
                return this.$t('r_f')
            } else if (name === 'total_maps') {
                return this.$t('d_t_s')
            } else {
                return ''
            }
        },

        //注单 标题
        betTitle(play = {}, group = {}, match = {}) {
            const {code} = group

            console.log('match', match);
            console.log('play', play);
            console.log('group.code', code);

            let title = ''

            // 独赢
            if (code === 'full_time_result') {
                title = play.name === '1' ? match.home_name : play.name === 'x' ? this.$t('pingj') : match.away_name
            }

            // 让分三项
            if (code === 'basketball_point_spread_3_way') {
                let team = play.header === '1' ? match.home_name : play.header === 'x' ? this.$t('pingj') : match.away_name
                if (play.header === '1') {
                    team = match.home_name
                } else if (play.header === '2') {
                    team = match.away_name
                } else {
                    console.log(group);
                    let market = group.markets.find(market => market.handicap === play.handicap && market.header !== 'x')
                    team = `${this.$t('pingj')} (${market.header === '2' ? match.away_name : match.home_name})`
                }
                title = team + '  ' + play.handicap
            }

            // 让球
            else if (code === 'asian_handicap') {
                let team = title = play.header2 === 'h' ? match.home_name : match.away_name
                title = team + '  ' + (play.handicap && play.handicap.replace(',', '/'))
            }

            // 大小盘
            else if (code === 'match_goals') {
                title = play.header + '  ' + (play.handicap && play.handicap.replace(',', '/'))
            }

            // 全场/半场比分
            else if (code === 'correct_score' || code === 'half_time_correct_score' || code === 'incorrect_score' || code === 'half_time_incorrect_score') {
                let team = play.header === '1' ? match.home_name : play.header === 'x' ? this.$t('pingj') : match.away_name
                title = team + '  ' + play.name
            }

            // 比赛投注(篮球)
            else if (this.isMatchBetting(code)) {
                let team = Number(play.header) === 1 ? match.home_name : match.away_name

                if (play.name === 'Total') {
                    title = (Number(play.header) === 1 ? this.$t('height') : this.$t('below')) + '   ' + play.handicap
                } else {
                    title = team + '  ' + play.handicap
                }
            } else if (code === 'tennis_to_win_match') {

                title = Number(play.header) === 1 ? match.home_name : match.away_name

            } else if (code === 'tennis_set_betting') {
                let team = Number(play.header) === 1 ? match.home_name : match.away_name

                title = team + '   ' + play.name
            } else if (code === 'volleyball_game_lines') {
                let team = Number(play.header) === 1 ? match.home_name : match.away_name

                if (play.name === 'total_points') {
                    title = (Number(play.header) === 1 ? this.$t('height') : this.$t('below')) + '   ' + play.handicap
                } else {
                    title = team + '  ' + play.handicap
                }
            } else if (code === 'tennis_set_1_winner' || code === 'tennis_set_winner') {
                title = Number(play.header) === 1 ? match.home_name : match.away_name
            } else if (code === 'volleyball_correct_set_score') {
                let team = Number(play.header) === 1 ? match.home_name : match.away_name
                title = team + '  ' + play.name
            } else if (code === 'baseball_game_lines') {

                let team = Number(play.header) === 1 ? match.home_name : match.away_name

                if (play.name === 'total_points') {
                    title = (Number(play.header) === 1 ? this.$t('height') : this.$t('below')) + '   ' + play.handicap
                } else {
                    title = team + '  ' + play.handicap
                }
            } else if (code === 'esports_match_lines') {
                let team = Number(play.header) === 1 ? match.home_name : match.away_name

                if (play.name === 'total_maps') {
                    title = (Number(play.header) === 1 ? this.$t('height') : this.$t('below')) + '   ' + play.handicap
                } else {
                    title = team + '  ' + play.handicap
                }
            }

            return title
        },

        /**
         * 判断是否为比赛投注 模板
         * 比赛投注 basketball_game_lines
         * 上半场 basketball_1st_half
         * 上半场投注 basketball_1st_half_lines
         * 下半场 basketball_2nd_half
         * 下半场投注 basketball_2nd_half_lines
         * 第一节投注 basketball_1st_quarter_lines
         * 第一节 basketball_1st_quarter
         * 第二节投注 basketball_2nd_quarter_lines
         * 第二节 basketball_2nd_quarter
         * 第三节投注 basketball_3rd_quarter_lines
         * 第三节 basketball_3rd_quarter
         * 第四节投注 basketball_4th_quarter_lines
         * 第四节 basketball_4th_quarter
         */
        isMatchBetting(code) {
            let arr = [
                'basketball_game_lines',
                'basketball_1st_half',
                'basketball_1st_half_lines',
                'basketball_2nd_half',
                'basketball_2nd_half_lines',
                'basketball_1st_quarter',
                'basketball_1st_quarter_lines',
                'basketball_2nd_quarter',
                'basketball_2nd_quarter_lines',
                'basketball_3rd_quarter',
                'basketball_3rd_quarter_lines',
                'basketball_4th_quarter',
                'basketball_4th_quarter_lines'
            ]

            return arr.indexOf(code) > -1
        },

        activeClass(play = {}, match = {}) {
            const match_id = match.id || match.match_id
            const key = `${match_id}-${play.market_id}`

            if (String(play.is_show) === '0' || String(play.is_suspend) === '1' || String(match.status) === '3') {
                return ''
            }

            return this.betKeys.includes(key) ? 'active' : ''
        }
    }
}
