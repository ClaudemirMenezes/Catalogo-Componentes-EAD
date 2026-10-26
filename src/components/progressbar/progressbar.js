import { inject, watch } from 'vue'

export const ProgressBar = {
    setup(props) {

        const ppu =  inject('ppu')

        props.progress = ppu.value.status.percentage

        watch(() => ppu.value.status.percentage, () => {
            props.progress = ppu.value.status.percentage
        })
       
    },
    props: {
        progress: String
    },
    template: `
    <div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="'width: '+progress+'%;'" :aria-valuenow="progress.value" aria-valuemin="0" aria-valuemax="100">{{progress}}%</div>
        </div>
        
    </div>
    `
}