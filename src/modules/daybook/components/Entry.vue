<template>
    <div
        class="entry-container mb-3 pointer p-2"
        @click="$router.push( {name: 'entry', params: { id: 10 }} )"
    >

        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2021, jueves</span>
        </div>
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat rem fuga obcaecati iusto! Sed fugit ipsum eos natus expedita doloremque nulla, maxime deserunt molestias odit unde voluptatem repellendus pariatur vero!
            Molestiae, doloribus! Accusamus consequuntur quidem corporis consequatur beatae sed quia aspernatur, facere ea nam mollitia repudiandae ex nulla? Incidunt repellat placeat explicabo expedita ratione reprehenderit accusamus laboriosam quasi natus autem!
        </div>
    </div>
</template>

<script>
export default {
    name: "Entry-items"
}
</script>

<style lang="scss" scoped>
    .entry-container{
        border-bottom: 1px solid #2ce350;
        transition: .2 all ease-in;
        .entry-description{
            font-size: 12pt;
        }
        &:hover{
            background-color: lighten($color: grey, $amount: 45); 
        }
    }
</style>