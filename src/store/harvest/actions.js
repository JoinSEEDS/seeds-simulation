
export const getDataTable = async function ({ dispatch, commit }, tableId) {
  // Do your magic
  // Filter by tableID
  const data = { values: 'This is a little demo' }
  console.log('Get data table for the id:', tableId)
  switch (tableId) {
    case 1: // Replace by constant
      commit('setDataTable1', data)
      break
    case 2: // Replace by constant
      commit('setDataTable2', data)
      break
    default:
      break
  }
  return true
}
