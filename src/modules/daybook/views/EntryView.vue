<template>
    <template v-if="entry">
        <div class="entry-tittle d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
            <div>
                <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpg">
                <button
                    v-if="entry.id"
                    class="btn btn-danger mx-2"
                    @click="onDeleteEntry"
                >
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button 
                    class="btn btn-primary"
                    @click="onSelectImage"
                >
                        Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
            {{entriesById}}
        </div>
        <hr>
        <div>
            <div class="d-flex flex-column px-3 h-75">
                <textarea 
                    placeholder="Que sucedio hoy?"
                    v-model="entry.text"
                ></textarea>
            </div>
        </div>
        <img v-if="entry.picture && !localImage" :src="entry.picture" alt="entry-picture" class="img-thumbnail">
        <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail">
    </template>
    <Fab 
        icon="fa fa-2x fa-save"
        @on:click="saveEntry"
    />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapGetters } from 'vuex'
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear"
import Swal from 'sweetalert2'
import uploadImage from '../helpers/uploadImage'
export default {
    name: 'entry-view',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear( this.entry.date )
            return day;
        },
        month() {
            const { month } = getDayMonthYear( this.entry.date )
            return month;
        },
        yearDay() {
            const { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay;
        }
    },
    methods:{
        ...mapActions('journal', ['updateEntry', 'createEntry', 'loadEntries', 'deleteEntry']),
        loadEntry(){
            let entry;
            if(this.id === 'new'){
                entry = {
                    text:'',
                    date: new Date().getTime()
                }
            } else{
                entry = this.getEntryById( this.id );
                if ( !entry ) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = entry;
        },
        async saveEntry(){
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })

            Swal.showLoading()

            const picture = await uploadImage( this.file ?? this.entry.picture )

            this.entry.picture = picture;
            if( this.entry.id ){
                await this.updateEntry(this.entry)
            } else {
                const redirectToNew = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id: redirectToNew } })
            }
            this.file = null;
            this.localImage = null;
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
        },
        async onDeleteEntry(){
            const { isConfirmed } = await Swal.fire({
                title: 'Esta seguro ?',
                text: 'una vez borrado no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            if(isConfirmed){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                this.deleteEntry(this.entry.id)
                this.$router.push({ name: 'entry', params: { id: 'new' } })
                Swal.fire('Eliminado', 'Entrada eliminada con éxito', 'success')
            }
        },
        onSelectedImage( event ){
            const file = event.target.files[0];
            if(!file){
                this.localImage = null
                this.file = null
                return
            }
            this.file = file;
            const fr = new FileReader();
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
        }
    },
    created(){
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>

    textarea{
        font-size: 20px;
        border: none;
        height: 100%;
        &:focus{
            outline: none;
        }
    }
    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0 5px 10px rgba($color: #000000, $alpha: .2);
    }
</style>