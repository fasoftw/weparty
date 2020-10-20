<template>
    <div class="notification">
        <notification-bell
        :size="20"
        :count="2"
        upperLimit="50"
        counterLocation="upperRight"
        counterStyle="roundRectangle"
        counterBackgroundColor="#c800ff"
        counterTextColor="#FFFFFF"
        iconColor="#f6eeee"
        :animated="true"
    />
    </div>
</template>

<script>
import NotificationBell from 'vue-notification-bell'
export default {
    name: 'Notification',
    components: {NotificationBell},
    props: {
        hideNotification: Boolean
    }

}
</script>

<style>
    
</style>