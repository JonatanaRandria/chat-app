import { Input, Layout } from '@/common/components';
import { CreateUser } from '@/common/types';
import { cache } from '@/common/utils';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

const userSignUpDefaultValues: CreateUser = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userName: '',
    confirmPassword: '',
};

const passwordConfirmValidator = (value: string, user: CreateUser) => {
    if (value.length === 0) {
        return 'Champ obligatoire';
    }
};

const SignInPage = () => {
    const form = useForm<CreateUser>({
        defaultValues: userSignUpDefaultValues,
        mode: 'all',
    });

    const { push } = useRouter();

    const handleSubmit = form.handleSubmit((createUser: CreateUser) => {
        const user = { ...createUser };
        delete user.confirmPassword;
        cache.user(user);
        push('/chat');
    });

    return (
        <Layout>
            <FormProvider {...form}>
                <section className="vh-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black">
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                    <Input label='Username' name='userName' />
                                                    <Input label='Email' name='email' />
                                                    <Input label='Password' name='password' />
                                                    <Input
                                                        label='Confirm password'
                                                        name='confirmPassword'
                                                        validate={passwordConfirmValidator}
                                                    />

                                                </form>

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                    className="img-fluid" alt="Sample image" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FormProvider>
        </Layout>
    );
};

export default SignInPage;