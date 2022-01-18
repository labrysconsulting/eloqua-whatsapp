module.exports = class Instance {
    constructor({ instanceId, installId, userName, userId, userCulture, siteName, siteId, appId, entityType, customObjectId, mobilePhoneField, message, executionId }) {
        this.instanceId = instanceId
        this.installId = installId
        this.userName = userName
        this.userId = userId
        this.userCulture = userCulture
        this.siteName = siteName
        this.siteId = siteId
        this.appId = appId
        this.entityType = entityType
        this.customObjectId = customObjectId
        this.mobilePhoneField = mobilePhoneField
        this.message = message
        this.executionId = executionId
    }

    getInstanceId() {
        return this.instanceId
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
    getEntityType() {
        return this.entityType
    }
    getCustomObjectId() {
        return this.customObjectId
    }
    getMobilePhoneField() {
        return this.mobilePhoneField
    }
    getMessage() {
        return this.message
    }
    getExecutionId() {
        return this.executionId
    }
}