export function transModelToParams(model, issue) {
  if (!model || !issue) return null;
  return {
    lot_code: String(model.lotId), // 彩种ID
    play_id: String(model.playId), // 玩法ID
    issue_id: String(issue.issue_id), // 期号ID
    bet_multiple: String(model.multi), // 倍数
    bet_number: String(model.betNum), // 投注内容
    total_amount: String(model.cost), // 投注总金额
    bet_count: String(model.betCount) // 注数
  }
}

export function transModelToCartItem(model, issue, path) {
  if (!model || !issue) return null;
  return {
    lot_code: String(model.lotId), // 彩种ID
    lot_name: String(model.lotName),
    play_id: String(model.playId), // 玩法ID
    play_name: String(model.playName),
    issue_id: String(issue.issue_id), // 期号ID
    issue_code: String(issue.issue_code),
    bet_multiple: String(model.multi), // 倍数
    bet_number: String(model.betNum), // 投注内容
    show_bet_number: String(model.showBetNum), // 显示的投注内容
    total_amount: String(model.cost), // 投注总金额
    bet_count: String(model.betCount), // 注数
    max_profit: model.maxProfit,
    max_bonus: model.maxBonus,
    unit_price: model.unitPrice,
    route_path: path
  }
}

export function calcTotalCost(params) {
  if (!params) return 0
  if (!(params instanceof Array)) {
    params = [params]
  }
  return params.reduce((total, item) => {
    total += Number(item.total_amount)
    return total
  }, 0)
}

export function calcTotalWager(params) {
  if (!params) return 0
  if (!(params instanceof Array)) {
    params = [params]
  }
  return params.reduce((total, item) => {
    total += Number(item.bet_count)
    return total
  }, 0)
}


export function calcTotalTimes(params) {
  if (!params) return 0
  if (!(params instanceof Array)) {
    params = [params]
  }
  return params.reduce((total, item) => {
    total += Number(item.bet_multiple)
    return total
  }, 0)
}
