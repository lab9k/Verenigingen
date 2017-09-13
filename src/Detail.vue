<template>
    <div id="detail">
        {{ msg }}
    </div>
</template>

<script>
    export default {
    name: 'detail',
        data() {
            return {
                msg: 'Detailpage',
                lijst: verenigingList
            }
        },
    }
</script>