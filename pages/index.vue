<template>
<div>
    <div>
        <contentCover />
    </div>
    <div>
        <contentRevenue/>
    </div>
</div>
</template>

<script>
import contentCover from '@/components/contentCover'
import contentRevenue from '@/components/contentRevenue'
export default {
    layout: 'main',
    components: {
        contentCover,
        contentRevenue
    }
}
</script>

<style>

</style>
