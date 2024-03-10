// 0=未开赛；1=滚球中；3=已结束
export function aliasStatus(status) {
    switch (String(status)) {
        case '0':
            return 'w_k_s' // 未开赛
        case '1':
            return 'g_q_z' // 滚球中
        case '2':
            return 'b_s_r' // 比赛确认中
        case '3':
            return 'y_j_s' // 已结束'
        case '4':
            return 't_c'   // 推迟
        case '5':
            return 'y_q_x' // 已取消
        case '6':
            return 't_s' // 退赛
        case '7':
            return 'z_d' // 中断
    }
}

export const handicaps = [
    // 足球
    {code: 'asian_handicap_goal', name: 'a_h_goal', sport: '1'},
    {code: 'full_time_result', name: 'full_time_result', sport: '1'},
    {code: 'asian_handicap', name: 'asian_handicap', sport: '1'},
    {code: 'match_goals', name: 'match_goals', sport: '1'},

    // 篮球
    {code: 'basketball_game_lines', name: 'b_g_lines', sport: '18'},
    {code: 'basketball_game_lines_spread', name: 'game_lines_spread', sport: '18'},
    {code: 'basketball_game_lines_total', name: 'game_lines_total', sport: '18'},
    {code: 'basketball_game_lines_money_line', name: 'game_lines_money_line', sport: '18'},

    // 网球
    {code: 'tennis_to_win_match', name: 't_t_w_match', sport: '13'},

    // 排球
    {code: 'volleyball_game_lines', name: 'b_g_lines', sport: '91'},

    // 棒球
    {code: 'baseball_game_lines', name: 'b_g_lines', sport: '16'},

    // 电子竞技
    {code: 'esports_match_lines', name: 'to_win', sport: '151'},
]

export const sports = [
    {text: 'fball', id: 1},
    {text: 'bball', id: 18},
    {text: 'tennis', id: 13},
    {text: 'vball', id: 91},
    {text: 'b_ball', id: 16},
    {text: 'esports', id: 151},
]

export const getCustomiseSports = siteCode => {
    switch(siteCode) {
        case 'v015':
        case 't023':
        case 't061':
            return [
                {text: 'fball', id: 1},
            ]
        default:
            return sports
    }
}

export const navItems = [
    {text: 'fball', id: '1' },
    {text: 'bball', id: '18' },
    {text: 'tennis', id: '13' },
    {text: 'vball', id: '91' },
    {text: 'b_ball', id: '16' },
    {text: 'esports', id: '151' },
    {text: 'z_bjl', id: '32' },
    {text: 'q_p', id: '38' },
    {text: 'c_p', id: 'cp' },
    {text: 'l_h_j', id: '33' },
    {text: 'b_y', id: '36' },
    {text: 'd_j', id: '37' },
]

export const getCustomiseNavItems = siteCode => {
    switch(siteCode) {
        case 'v015':
        case 't023':
        case 't061':
            return [
                {text: 'fball', id: '1' },
            ]
        default:
            return navItems
    }
}