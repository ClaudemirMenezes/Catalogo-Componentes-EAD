import { ref, computed, onMounted, inject, watch } from 'vue'
import { Random } from '../../composables/randon.js'
import ppu from '../../composables/ppu.js'

const Item = {
    props: {
        id: {},
        status: {
            type: Boolean,
        }
    },
    template: `
        <template v-if="status != null">
            <template v-if="status">
                <p class="unasus-test-item status-success">Alternativa correta!</p>
            </template>
            <template v-else>
                <p class="unasus-test-item status-fail">Alternativa incorreta!</p>
            </template>
        </template>
        <div class="unasus-test-item test-item">
            <div class="unasus-test-item test-item-wrapper">
                <div class="unasus-test-item input-area">
                    <slot></slot>
                </div>
                <div class="unasus-test-item statement">
                    <label :for="id">
                        <slot name="statement"></slot>
                    </label>
                </div>
            </div>
            <slot name="feedback"></slot>
        </div>
    `
}

const RadioItem = {
    props: {
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        status: {
            type: Boolean,
        },
        index: {
            type: Number,
        },
        hasFeedback: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['selected', 'feedback'],
    components: {
        Item,
    },
    setup(props, ctx) {
        const methods = {
            input: () => {
                ctx.emit('selected', {
                    id: props.id,
                    index: props.index,
                })             
            },
            onFeedback: () => {
                ctx.emit('feedback')
            }
        }

        return {
            methods,
        }
    },
    template: `
        <Item :status="status" :id="id">
            <input @input="methods.input" :id="id" :name="name" type="radio" />
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:feedback v-if="status != null && hasFeedback">
                <div @click="methods.onFeedback" :class="{ fail: !status, success: status }" class="unasus-test-item feedback-btn">ler feedback</div>
            </template>
        </Item>
    `
}

const CheckBoxItem = {
    props: {
        id: {
            type: String,
        },
        index: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: false,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        hasFeedback: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['selected', 'feedback'],
    components: {
        Item,
    },
    setup(props, ctx) {
        const methods = {
            input: () => {
                if (props.checked) {
                    props.checked = false
                } else {
                    props.checked = true
                }

                ctx.emit('selected', {
                    status: props.checked,
                    id: props.id,
                    index: props.index,
                })    
            },
            onFeedback: () => {
                ctx.emit('feedback')
            }
        }

        return {
            methods,
        }
    },
    template: `
        <Item :status="status" :id="id">
            <input :checked="checked" @input="methods.input()" :id="id" type="checkbox" />
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:feedback v-if="status != null && hasFeedback">
                <div @click="methods.onFeedback" :class="{ fail: !status, success: status }" class="unasus-test-item feedback-btn">ler feedback</div>
            </template>
        </Item>
    `
}

const SelectItem = {
    props: {
        id: {},
        options: {
            type: Array,
            required: true,
        },
        status: {
            type: Boolean,
        },
        reset: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['selected', 'feedback'],
    components: {
        Item,
    },
    setup(props, ctx) {
        const select = ref(null)
        let hasFeedback = ref(null)

        const methods = {
            input: (e) => {
                let data = e.target.value.split('_')

                hasFeedback.value = props.options[data[0]].feedback ? true : false
             
                ctx.emit('selected', {
                    _index: props.id,
                    id: data[1],
                    index: data[0],
                })             
            },
            setData: (data) => {
                return data.index + '_' + data.id
            },
            onFeedback: () => {
                let data = select.value.value.split('_')

                ctx.emit('feedback',  {
                    _index: props.id,
                    index: data[0],
                })
            }
        }

        return {
            methods,
            select,
            hasFeedback
        }
    },
    template: `
        <Item :status="status" :id="id">
            <select
                :disabled="disabled"
                ref="select"
                :id="id"
                @input="methods.input"
            >
                <option :selected="reset" disabled>Opções</option>
                <template v-for="(option, index) in options">
                    <option
                        :key="index"
                        :value="methods.setData(option)"
                        v-html="option.name"
                    ></option>
                </template>
            </select>
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:feedback v-if="status != null && hasFeedback">
                <div
                    @click="methods.onFeedback"
                    :class="{ fail: !status, success: status }"
                    class="unasus-test-item feedback-btn"
                >
                    ler feedback
                </div>
            </template>
        </Item>
    `
}

const TestContainer = {
    props: {
        status: {
            type: Object,
            default: {
                success: false,
                fail: false
            }
        },
        id: {
            type: String,
            required: true,
        },
        isRight: {
            type: Boolean,
        },
        modal: {
            type: Object,
            default: {
                feedback: '',
                status: false,
            }
        }
    },
    emits: ['status'],
    setup(props, ctx) {
        const PPU = inject('ppu')
        const Config = inject('config')

        watch(() => props.isRight, (data) => {
            ppu.setTestControl(props.id, PPU.value, Config)
        })

        ppu.getTestControl(props.id, PPU.value.test).then((data) => {
            ctx.emit('status', data)
        })

        return {}
    },
    template: `
        <div class="unasus-test-container container">
            <div class="unasus-test-container header">
                <div class="unasus-test-container status-test" :class="status">
                    <slot name="status-text">
                        <p>Você não concluiu esta tarefa</p>
                    </slot>
                </div>
                <div class="unasus-test-container statement">
                    <slot name="statement"></slot>
                </div>
            </div>
            <div class="unasus-test-container content">
                <slot name="options"></slot>
            </div>
            <div class="unasus-test-container footer">
                <slot name="footer"></slot>
            </div>
            <Modal :open="modal.status" @close="modal.status = false">
                <template v-slot:title>Feedback</template>
                <template v-slot:content>
                    <div class="row">
                        <div class="col-12" v-html="modal.feedback"></div>
                    </div>
                </template>
            </Modal>
        </div>
    `
}

const DropdownOptionTest = {
    components: {
        TestContainer,
        SelectItem
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        structure: {
            type: Array,
            required: false
        },
        id: {
            type: String,
            required: true
        }
    },
    setup(props, ctx) {
        let selectedBag = []
        const rightOptions = []

        const statusTextOp = {
            default: 'Você não concluiu esta tarefa',
            success: 'Você concluiu esta tarefa',
            fail: 'Algo de errado aconteceu'
        }

        const data = ref({
            disabledBtn: true,
            statusTest: false,
            dataStatusText: statusTextOp.default,
            status: {
                success: false,
                fail: false,
            },
            wasRight: false,
            modal: {
                feedback: null,
                status: false,
            }
        })

        const methods = {
            selectedBag: (value) => {
                for (let i = 0; i < selectedBag.length; i++) {
                    if (value._index == selectedBag[i]['_index']) {
                        selectedBag.splice(i, 1)

                        break
                    }
                }

                props.options[value._index]['_reset'] = false

                selectedBag.push({
                    _index: value._index,
                    index: value.index,
                    id: value.id,
                })

                if (selectedBag.length == rightOptions.length) {
                    data.value.disabledBtn = false
                } else {
                    data.value.disabledBtn = true
                }
            },  
            prepareData: (data) => {
               for (let i = 0; i < data.length; i++) {
                    data[i]['_status'] = null
                    data[i]['_reset'] = true
                    data[i]['_disabled'] = false
                
                    for (let j = 0; j < data[i].options.length; j++) {
                        let id = Random(5)

                        data[i].options[j]['id'] = id
                        data[i].options[j]['index'] = j

                        if (data[i].options[j]['status']) {
                            rightOptions.push(id)
                        }
                    }
                }
            },
            resetStatusData: (_data) =>  {
                for (let i = 0; i < _data.length; i++) {
                    _data[i]['_status'] = null
                    _data[i]['_reset'] = true
                    _data[i]['_disabled'] = false
                }

                selectedBag = []
                data.value.statusTest = false
                
                if (!data.value.wasRight) {
                    data.value.dataStatusText = statusTextOp.default
                    data.value.status.fail = false
                    data.value.status.success = false
                }
                
                data.value.disabledBtn = true
            },
            verify: () => {
                let lengthRightOptions = rightOptions.length

                for (let i = 0; i < selectedBag.length; i++) {
                    props.options[i]['_disabled'] = true

                    props.options[selectedBag[i]['_index']]['_status'] =
                    props.options[selectedBag[i]['_index']].options[selectedBag[i]['index']]['status']

                    for (let j = 0; j < rightOptions.length; j++) {
                        if (selectedBag[i]['id'] == rightOptions[j]) {
                            lengthRightOptions--
                            
                            break
                        }   
                    }
                }

                if (!lengthRightOptions) {
                    if (!data.value.wasRight) {
                        data.value.dataStatusText = statusTextOp.success
                        data.value.status.success = true
                        data.value.status.fail = false
                    }
                    
                    data.value.statusTest = false
                    data.value.wasRight = true
                } else {
                    if (!data.value.wasRight) {
                        data.value.dataStatusText = statusTextOp.fail
                        data.value.status.success = false
                        data.value.status.fail = true
                    }
                    
                    data.value.statusTest = true
                }
            },
            getStatus: (status) => {
                if (status) {
                    data.value.wasRight = true
                    data.value.dataStatusText = statusTextOp.success
                    data.value.status.success = true
                }
            },
            getFeedback: (_data) => {
                data.value.modal.feedback = props.options[_data._index].options[_data.index].feedback
                data.value.modal.status = true
            },
        }

        methods.prepareData(props.options)

        return {
            data,
            methods,
        }
    },
    template: `
        <TestContainer class="dropdown" :modal="data.modal" :isRight="data.wasRight" @status="methods.getStatus" :id="id" :status="data.status">
            <template v-slot:status-text>
                <p>{{ data.dataStatusText }}</p>
            </template>
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:options v-if="typeof structure == 'undefined'">
                <template v-for="(option, index) in options">
                    <SelectItem :disabled="option._disabled" :reset="option._reset" @feedback="methods.getFeedback" :status="option._status" @selected="methods.selectedBag" :id="index" :options="option.options">
                        <span v-html="option.statement"></span>
                    </SelectItem>
                </template>
            </template>
            <template v-slot:options v-if="typeof structure != 'undefined'">
                <div class='wrap-table'>
                    <table class='table table-striped'>
                        <thead >
                            <tr>
                                <th v-for="(header, index) in structure.headers" :key="index" class="italico">
                                    {{ header }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, idx) in structure.rows" :key="idx">
                                <td v-for="(r, i) in row" :key="i">
                                    <template v-if="typeof r === 'string'">
                                        <span v-html="r"></span>
                                    </template>
                                    <template v-else>
                                        <SelectItem :disabled="options[r]._disabled" :reset="options[r]._reset" @feedback="methods.getFeedback" :status="options[r]._status" @selected="methods.selectedBag" :id="r" :options="options[r].options"></SelectItem>
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-slot:footer>
                <Unasus-Button v-if="!data.statusTest" @click="methods.verify" :disabled="data.disabledBtn">Responder</Unasus-Button>
                <Unasus-Button v-if="data.statusTest" @click="methods.resetStatusData(options)" :disabled="data.disabledBtn">Refazer</Unasus-Button>
            </template>
        </TestContainer>
    `
}

const OneOptionTest = {
    components: {
        TestContainer,
        RadioItem
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        id: {
            type: String,
            required: true,
        }
    },
    setup(props, ctx) {
        let selectedBag = null
        let rightOption = null

        const statusTextOp = {
            default: 'Você não concluiu esta tarefa',
            success: 'Você concluiu esta tarefa',
            fail: 'Algo de errado aconteceu'
        }

        const data = ref({
            statusTest: false,
            dataStatusText: statusTextOp.default,
            status: {
                success: false,
                fail: false,
            },
            idName: Random(5),
            wasRight: false,
            modal: {
                feedback: null,
                status: false,
            }
        })

        const methods = {
            selectedBag: (value) => {
                selectedBag = {
                    id: value.id,
                    index:  value.index,
                }

                methods.verify()
            },
            prepareData: (data) => {
                for (let i = 0; i < data.length; i++) {
                    let id = Random(5)
                    
                    data[i]['id'] = id
                    data[i]['_status'] = null

                    if (data[i].status) {
                        rightOption = id
                    }
                }
            },
            resetStatusData: (data) => {
                for (let i = 0; i < data.length; i++) {
                    data[i]['_status'] = null
                }
            },
            verify: () => {
                methods.resetStatusData(props.options)
                
                props.options[selectedBag.index]._status =
                    props.options[selectedBag.index].status

                if (selectedBag.id == rightOption) {
                    if (!data.value.wasRight) {
                        data.value.dataStatusText = statusTextOp.success
                        data.value.status.success = true
                        data.value.status.fail = false
                    }

                    data.value.wasRight = true
                } else {
                    if (!data.value.wasRight) {
                        data.value.dataStatusText = statusTextOp.fail
                        data.value.status.success = false
                        data.value.status.fail = true
                    }
                }
            },
            getStatus: (status) => {
                if (status) {
                    data.value.wasRight = true
                    data.value.dataStatusText = statusTextOp.success
                    data.value.status.success = true
                }
            },
            getFeedback: (feedback) => {
                data.value.modal.feedback = feedback
                data.value.modal.status = true
            },
            hasFeedback: (option) => { return option.feedback ? true : false }
        }

        methods.prepareData(props.options)

        return {
            data,
            methods,
        }
    },
    template: `
        <TestContainer :modal="data.modal" :isRight="data.wasRight" @status="methods.getStatus" :id="id" :status="data.status">
            <template v-slot:status-text>
                <p>{{ data.dataStatusText }}</p>
            </template>
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:options>
                <template v-for="(option, index) in options">
                    <RadioItem :hasFeedback="methods.hasFeedback(option)" @feedback="methods.getFeedback(option.feedback)" :status="option._status" :index="index" :id="option.id" :name="data.idName" @selected="methods.selectedBag">
                        <span v-html="option.statement"></span>
                    </RadioItem>
                </template>
            </template>
        </TestContainer>
    `
}

const MultiOptionsTest = {
    components: {
        TestContainer,
        CheckBoxItem
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        id: {
            type: String,
            required: true,
        }
    },
    setup(props, ctx) {
        let selectedBag = []
        const rightOptions = []

        const statusTextOp = {
            default: 'Você não concluiu esta tarefa',
            success: 'Você concluiu esta tarefa',
            fail: 'Algo de errado aconteceu'
        }

        const data = ref({
            disabledBtn: true,
            statusTest: false,
            dataStatusText: statusTextOp.default,
            status: {
                success: false,
                fail: false,
            },
            wasRight: false,
            modal: {
                feedback: null,
                status: false,
            }
        })

        const methods = {
            selectedBag: (value) => {
                if (value.status) {
                    selectedBag.push({
                        id: value.id,
                        index:  value.index,
                    })

                    props.options[value.index]['_checked'] = true
                } else {
                    for (let i = 0; i < selectedBag.length; i++) {
                        if (selectedBag[i]['id'] == value.id) {
                            selectedBag.splice(i, 1)
                            props.options[value.index]['_checked'] = false

                            break
                        }
                    }
                }

                // to control the status of disabled button
                if (selectedBag.length) {
                    data.value.disabledBtn = false
                } else {
                    data.value.disabledBtn = true
                }
            },
            prepareData: (data) => {
                for (let i = 0; i < data.length; i++) {
                    let id = Random(5)
                    
                    data[i]['id'] = id
                    data[i]['_status'] = null
                    data[i]['_checked'] = false

                    if (data[i].status) {
                        rightOptions.push(id)
                    }
                }
            },
            resetStatusData: (_data) => {
                for (let i = 0; i < _data.length; i++) {
                    _data[i]['_status'] = null
                    _data[i]['_checked'] = false
                }

                selectedBag = []
                data.value.disabledBtn = true
                data.value.statusTest = false
                
                if (!data.value.wasRight) {
                    data.value.dataStatusText = statusTextOp.default
                    data.value.status.fail = false
                    data.value.status.success = false
                }
            },
            verify: () => {
                if (selectedBag.length) {
                    let lengthSelectBag = selectedBag.length
                    let lengthRightOptions = rightOptions.length
    
                    for (let i = 0; i < selectedBag.length; i++) {
                        for (let j = 0; j < rightOptions.length; j++) {
                            props.options[selectedBag[i]['index']]['_status'] = 
                                props.options[selectedBag[i]['index']]['status']
    
                            if (selectedBag[i]['id'] == rightOptions[j]) {
                                lengthSelectBag--
                                lengthRightOptions--
                                
                                break
                            }
                        }
                    }

                    if (!lengthSelectBag && !lengthRightOptions) {
                        if (!data.value.wasRight) {
                            data.value.dataStatusText = statusTextOp.success
                            data.value.status.success = true
                            data.value.status.fail = false
                        }

                        data.value.statusTest = false
                        data.value.wasRight = true
                    } else {
                        if (!data.value.wasRight) {
                            data.value.dataStatusText = statusTextOp.fail
                            data.value.status.fail = true
                            data.value.status.success = false
                        }

                        data.value.statusTest = true
                    }
                }
            },
            getStatus: (status) => {
                if (status) {
                    data.value.wasRight = true
                    data.value.dataStatusText = statusTextOp.success
                    data.value.status.success = true
                }
            },
            getFeedback: (feedback) => {
                data.value.modal.feedback = feedback
                data.value.modal.status = true
            },
            hasFeedback: (option) => { return option.feedback ? true : false },
        }

        methods.prepareData(props.options)

        return {
            data,
            methods,
        }
    },
    template: `
        <TestContainer :modal="data.modal" :isRight="data.wasRight" @status="methods.getStatus" :id="id" :status="data.status">
            <template v-slot:status-text>
                <p>{{ data.dataStatusText }}</p>
            </template>
            <template v-slot:statement>
                <slot></slot>
            </template>
            <template v-slot:options>
                <template v-for="(option, index) in options">
                    <CheckBoxItem :hasFeedback="methods.hasFeedback(option)" :checked="option._checked" @feedback="methods.getFeedback(option.feedback)" :status="option._status" :index="index" :id="option.id" @selected="methods.selectedBag">
                        <span v-html="option.statement"></span>
                    </CheckBoxItem>
                </template>
            </template>
            <template v-slot:footer>
                <Unasus-Button v-if="!data.statusTest" :disabled="data.disabledBtn" @click="methods.verify">Responder</Unasus-Button>
                <Unasus-Button @click="methods.resetStatusData(options)" v-if="data.statusTest" :disabled="data.disabledBtn">Refazer</Unasus-Button>
            </template>
        </TestContainer>
    `
}

const OpenTest = {
    components: {
        TestContainer,
    },
    props: {
        max: {
            type: Number,
            default: 500,
        },
        id: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const data = ref({
            text: '',
            disabledBtn: false,
            wasRight: false,
            //dataStatusText: statusTextOp.default,
            status: {
                success: false,
                fail: false,
            },
        })

        const lengthLetters = computed(() => { return data.value.text.length })

        const methods = {
            cutText: () => {
                if (lengthLetters.value > props.max) {
                    data.value.text = data.value.text.slice(0, props.max)
                }

                if (lengthLetters.value == 0) {
                    data.value.disabledBtn = true
                } else {
                    data.value.disabledBtn = false
                }
            },
            getStatus: (status) => {
                if (status) {
                    data.value.wasRight = true
                    data.value.status.success = true
                }
            },
            verify: () => {
                data.value.wasRight = true
                data.value.status.success = true
            }
        }

        onMounted(() => {
            if (lengthLetters.value == 0) {
                data.value.disabledBtn = true
            } else {
                data.value.disabledBtn = false
            }
        })

        return {
            data,
            lengthLetters,
            methods,
        }
    },
    template: `
    <TestContainer :id="id" :isRight="data.wasRight" :status="data.status" @status="methods.getStatus">
        <template v-slot:statement>
            <slot></slot>
        </template>
        <template v-slot:options>
            <div class="unasus-open-test title">Digite sua resposta:</div>
            <textarea v-model="data.text" @input="methods.cutText" placeholder="Digite sua resposta aqui"></textarea>
            <div class="unasus-open-test limit">Max: {{ max }} caracteres (<span>{{ lengthLetters }}</span> usados)</div>
        </template>
        <template v-slot:footer>
            <Unasus-Button @click="methods.verify" :disabled="data.disabledBtn">Responder</Unasus-Button>
        </template>
    </TestContainer>
`

}


export { MultiOptionsTest, OneOptionTest, DropdownOptionTest, OpenTest }