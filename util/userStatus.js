import store from '@/store/index.js'
import {
	mapState,
	mapMutations,
	mapGetters
} from 'vuex'

export default {
	data() {
		return {

		};
	},

	methods: {
		...mapMutations(['login', 'logout']),

	},
	computed: {
		...mapState({}),
		...mapGetters(['getHasLogin'])
	}
}
