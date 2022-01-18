module.exports = class App {
    constructor({ installId, userName, userId, userCulture, siteName, siteId, appId, callbackUrl }) {
        this.installId = installId
        this.userName = userName
        this.userId = userId
        this.userCulture = userCulture
        this.siteName = siteName
        this.siteId = siteId
        this.appId = appId
        this.callbackUrl = callbackUrl
    }

    getInstallId() {
        return this.installId
    }
    getUserName() {
        return this.userName
    }
    getUserId() {
        return this.userId
    }
    getUserCulture() {
        return this.userCulture
    }
    getSiteName() {
        return this.siteName
    }
    getSiteId() {
        return this.siteId
    }
    getAppId() {
        return this.appId
    }
    getCallbackUrl() {
        return this.callbackUrl
    }
}