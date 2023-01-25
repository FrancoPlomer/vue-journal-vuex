<template>
    <div
        class="entry-container mb-3 pointer p-2"
        @click="$router.push( {name: 'entry', params: { id: data.id }} )"
    >

        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold"> {{day}} </span>
            <span class="mx-1 fs-5"> {{month}} </span>
            <span class="mx-2 fw-light"> {{yearDay}} </span>
        </div>
        <div class="entry-description">
            {{shortText}}
        </div>
    </div>
</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
export default {
    name: "Entry-items",
    props: {
        data:{
            type: Object
        }
    },
    computed: {
        shortText(){
            return ( this.data.text.length > 30 )
                    ? this.entry.text.substring(0, 130) + '...'
                    :
                    this.data.text
        },
        day(){
            const date = new Date( this.data.date )
            return date.getDate()
        },
        month(){
            const date = new Date( this.data.date )
            return months[ date.getMonth() ]
        },
        yearDay(){
            const date = new Date( this.data.date )
            return ` ${ date.getFullYear() }, ${ days[ date.getDay() ] } `
        }
    }
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