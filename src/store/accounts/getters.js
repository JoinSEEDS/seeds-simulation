export const isAuthenticated = ({ account }) => (account && account !== 'Guest')
export const isGuest = ({ account }) => (account && account === 'Guest')
export const account = ({ account }) => account
export const loading = ({ loading }) => loading
export const isAutoLoading = ({ autoLogin }) => autoLogin
export const availableAccounts = ({ availableAccounts }) => availableAccounts.list.data
export const availableAccountsLoaded = ({ availableAccounts }) => availableAccounts.list.loaded
export const requestAccount = ({ requestAccount }) => requestAccount
