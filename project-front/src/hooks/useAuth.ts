import {
    forgotPasswordAction,
    loginUser,
    registerUser,
    resetPasswordAction,
} from '@/actions/auth-actions';
import { useUIStore } from '@/stores/ui.store';
import type {
    ForgotPasswordRequest,
    LoginCredentials,
    RegisterCredentials,
    ResetPasswordRequest,
} from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { update: updateSession } = useSession();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const result = await loginUser(credentials);

            if (!result.success) {
                throw new Error(result.error);
            }

            const authResult = await signIn('credentials', {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });

            if (authResult?.error) {
                throw new Error(authResult.error);
            }

            await updateSession();

            return result.data;
        },
        onSuccess: () => {
            addNotification({
                type: 'success',
                message: 'Login successful!',
            });
            const callbackUrl = searchParams.get('callbackUrl') || '/';
            router.push(callbackUrl);
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                message: error.message || 'Login failed. Please try again.',
            });
        },
    });
}

export function useRegister() {
    const router = useRouter();
    const { update: updateSession } = useSession();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async (credentials: RegisterCredentials) => {
            const result = await registerUser(credentials);

            if (!result.success) {
                throw new Error(result.error);
            }

            const authResult = await signIn('credentials', {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });

            if (authResult?.error) {
                throw new Error(authResult.error);
            }

            await updateSession();

            return result.data;
        },
        onSuccess: () => {
            addNotification({
                type: 'success',
                message: 'Registration successful! Welcome aboard!',
            });
            router.push('/');
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                message:
                    error.message || 'Registration failed. Please try again.',
            });
        },
    });
}

export function useLogout() {
    const router = useRouter();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async () => {
            await signOut({ redirect: false });
        },
        onSuccess: () => {
            addNotification({
                type: 'success',
                message: 'Logged out successfully',
            });
            router.push('/login');
        },
        onError: () => {
            addNotification({
                type: 'error',
                message: 'Logout failed. Please try again.',
            });
            router.push('/login');
        },
    });
}

export function useForgotPassword() {
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async (data: ForgotPasswordRequest) => {
            const result = await forgotPasswordAction(data.email);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result;
        },
        onSuccess: () => {
            addNotification({
                type: 'success',
                message: 'Password reset email sent! Check your inbox.',
            });
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                message: error.message || 'Failed to send reset email',
            });
        },
    });
}

export function useResetPassword() {
    const router = useRouter();
    const { addNotification } = useUIStore();

    return useMutation({
        mutationFn: async (data: ResetPasswordRequest) => {
            const result = await resetPasswordAction(data);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result;
        },
        onSuccess: () => {
            addNotification({
                type: 'success',
                message:
                    'Password reset successful! Please login with your new password.',
            });
            router.push('/login');
        },
        onError: (error: Error) => {
            addNotification({
                type: 'error',
                message: error.message || 'Password reset failed',
            });
        },
    });
}

export function useAuth() {
    const { data: session, status, update: updateSession } = useSession();

    return {
        user: session?.user,
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading',
        updateSession,
    };
}
