<template>
	<v-card>
		<v-dialog v-model="dialog" width="500">
			<template v-slot:activator="{ on }">
				<v-btn color="red lighten-2" dark v-on="on">
					Click Me
				</v-btn>
			</template>
			<v-alert type="success">
				Praesent venenatis metus at tortor pulvinar varius. Aenean
				commodo ligula eget dolor. Praesent ac massa at ligula laoreet
				iaculis. Vestibulum ullamcorper mauris at ligula.
			</v-alert>
		</v-dialog>
	</v-card>
</template>
<script>
export default {
    data() {
        return {
            dialog: false
        };
    }
};
</script>
