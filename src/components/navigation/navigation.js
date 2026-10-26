import { inject } from 'vue'
import { getIndexProperty, getPositionNavigation, getTextToIndex }  from '../../composables/navigation.js'

export default {
    props: {
        go: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const globalNavigation = inject('navigation')
        const config = inject('config')

        const methods = {
            goTo: () => {
                let dataNavigation = getIndexProperty(props.go)
                const navigation = getPositionNavigation(config.pages[dataNavigation.group], dataNavigation.page)

                globalNavigation.value.context = dataNavigation.group
                globalNavigation.value.previous = navigation.previous
                globalNavigation.value.current = navigation.current
                globalNavigation.value.next = navigation.next
            }
        }

        return {
            methods,
        }
    },
    template: `
        <span @click.prevent="methods.goTo"><slot></slot></span>
    `
}