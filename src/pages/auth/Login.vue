<template>

    <Page>
        <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
            <StackLayout class="form">
                <TextField  v-model="form.username" height="100" autocorrect="false" autocapitalizationType="none" hint="username/email" returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
                
                <TextField v-model="form.password" ref="password" height="100" hint="password" secure="true" returnKeyType="done" fontSize="18" />
        
                <Button text="Log In" @tap="submit" height="100" class="btn btn-primary m-t-20" backgroundColor="#289062" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Login",
        computed: {
            ...mapGetters({
                isAuthenticated: 'auth/authenticated'
            })
        },
        watch: {
            isAuthenticated(newValue, oldValue) {
                if(newValue)
                    this.$navigateTo(this.$routes.InventoryList);
            }
        },
        data() {
            return {
                isLoggingIn: true,
                submitting: false,
                form: {
                    username: '',
                    email: '',
                    password: '',
                    device_name: "dev",
                    remember: true
                },
            };
        },
        methods: {
            ...mapActions({
                signIn: 'auth/signIn',
                forgotPassword: 'auth/forgotPassword',
            }),
            async submit () {
                if(this.isInvalid()) return;
                this.submitting = true;
                try {
                    await this.signIn(this.form);
                } catch (error) {
                    console.log(error);
                    alert(error);
                }
                this.submitting = false;
            },
            isInvalid() {
                if (!this.form.username || !this.form.password) {
                    this.alert("Completa usuario y contraseña.");
                    return true;
                }
                return false;
            },
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            checkToken() {
                this.loadLocalStoredToken();
            },
        },
        mounted() {
            console.log('LOGIN mounted');
            console.log('isAuthenticated =', this.isAuthenticated);
            if(this.isAuthenticated)
                this.$navigateTo(this.$routes.InventoryList);
            /*
            login({
                title: "Your login title",
                message: "Your login message",
                okButtonText: "Your OK button text",
                cancelButtonText: "Your Cancel button text",
                userName: "Username field value",
                password: "Password field value"
            }).then(result => {
                console.log(`Dialog result: ${result.result}, user: ${result.userName}, pwd: ${result.password}`);
            });
            */
        },
    }
</script>

<style scoped>

</style>