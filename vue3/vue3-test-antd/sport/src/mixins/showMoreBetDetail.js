import {format} from "../assets/js/util";
import {aliasStatus} from "../common/config";

export default {
  data() {
    return {
      ids: []
    }
  },

  methods: {
    sportIcon(id) {
      let sport = Number(id)
      if (sport === 1) {
        return {
          icon: 'football-icon',
          text: this.$t('fball')
        }
      } else if (sport === 18) {
        return {
          icon: 'basketball-icon',
          text: this.$t('bball')
        }
      } else if (sport === 13) {
        return {
          icon: 'tennis-icon',
          text: this.$t('tennis')
        }
      } else if (sport === 91) {
        return {
          icon: 'volleyball-icon',
          text: this.$t('vball')
        }
      } else if (sport === 16) {
        return {
          icon: 'baseball-icon',
          text: this.$t('b_ball')
        }
      } else if (sport === 151) {
        return {
          icon: 'gaming-icon',
          text: this.$t('esports')
        }
      }
    },

    showMore(id) {
      let index = this.ids.findIndex(i => i === id)
      if (index > -1) {
        this.ids.splice(index, 1)
      } else {
        this.ids.push(id)
      }
    },

    putChildren(i, id) {
      // 如果单式
      if (i < 2) {
        return true;
      }

      // 如果大于2 并且没有展开
      if (this.ids.includes(id)) {
        return true
      } else {
        return false
      }
    },

    format(date, fmt) {
      return format(date, fmt)
    },

    aliasNum(ln) {
      const NUMS = [null, this.$t('n1'), this.$t('n2'), this.$t('n3'), this.$t('n4'), this.$t('n5'), this.$t('n6'), this.$t('n7'), this.$t('n8'), this.$t('n9'), this.$t('n10')]
      return this.$t('ntn', {n: NUMS[ln]})
    },

    betState(bet) {
      const {status} = bet
      switch (status) {
        case '0':
          return this.$t('d_k_j')
        case '1':
          return this.$t('y_z_j')
        case '2':
          return this.$t('w_z_j')
        case '3':
          return this.$t('y_c_d')
        case '4':
          return this.$t('w_c')
        case '5':
          return this.$t('y_z_f')
        case '6':
          return this.$t('y_c')
      }
    },

    betStatus(item) {
      const bet_status = {
        '3': this.$t('y_c_d'),
        '4': this.$t('w_c'),
        '5': this.$t('y_z_f'),
        '6': this.$t('y_c'),
      }
      const {status, settle_bonus} = item

      if (status === '1') {
        return {
          color: '#F13F40',
          text: `+${settle_bonus}`
        }
      } else if (status === '2') {
        return {
          color: '#00BF8B',
          text: settle_bonus
        }
      } else {
        return {
          color: '',
          text: bet_status[`${status}`]
        }
      }
    },

    // 比赛状态
    matchStatus(item) {
      // 如果比赛在进行中
      if (item.match_status === '1' || item.match_status === '3') {
        return {
          text: item.bet_extend ? `[${this.$t('groun')}: ${item.bet_extend}]` : item.ss ? `[${this.$t('groun')}: ${item.ss}]` : '',
          color: `#5FE8BD`
        }
      } else if (item.match_status === '2') {
        return {
          text: `[${this.$t('w_c')}]`,
          color: `#5FE8BD`
        }
      } else if (item.match_status === '4') {
        return {
          text: `[${this.$t('t_c')}]`,
          color: `#FFDF1B`
        }
      } else if (item.match_status === '7') {
        return {
          text: `[${this.$t('z_d')}]`,
          color: `#FFDF1B`
        }
      }

      const txt = aliasStatus(item.match_status)

      return {
        text: `[${this.$t(txt)}]`,
        color: `#FFDF1B`
      }
    },
  }
}
