<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div 
                :class="classModal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
            >

                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        Default body
                    </slot>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        hideClose: String,
        classModal: String
    },
    name: 'Modal',
    methods: {
        close() {
            this.$emit("close")
        }
    }

}
</script>

<style>

</style>