'use server';

import type {
    AuthResponse,
    AuthUser,
    LoginCredentials,
    RegisterCredentials,
    ResetPasswordRequest,
} from '@/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4050';

export async function loginUser(
    credentials: LoginCredentials
): Promise<AuthResponse<AuthUser>> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Login failed. Please check your credentials.',
            };
        }

        return {
            success: true,
            data: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role || 'user',
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            },
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Unable to connect to the server. Please try again later.',
        };
    }
}

export async function registerUser(
    credentials: RegisterCredentials
): Promise<AuthResponse<AuthUser>> {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Registration failed. Please try again.',
            };
        }

        return {
            success: true,
            data: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                role: data.user.role || 'user',
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            },
        };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: 'Unable to connect to the server. Please try again later.',
        };
    }
}

export async function forgotPasswordAction(
    email: string
): Promise<AuthResponse<{ message: string }>> {
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Failed to send reset email.',
            };
        }

        return {
            success: true,
            data: { message: 'Password reset email sent successfully.' },
        };
    } catch (error) {
        console.error('Forgot password error:', error);
        return {
            success: false,
            error: 'Unable to connect to the server. Please try again later.',
        };
    }
}

export async function resetPasswordAction(
    data: ResetPasswordRequest
): Promise<AuthResponse<{ message: string }>> {
    try {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                otp: data.otp,
                newPassword: data.newPassword,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: responseData.message || 'Failed to reset password.',
            };
        }

        return {
            success: true,
            data: { message: 'Password reset successfully.' },
        };
    } catch (error) {
        console.error('Reset password error:', error);
        return {
            success: false,
            error: 'Unable to connect to the server. Please try again later.',
        };
    }
}
