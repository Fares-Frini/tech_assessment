'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '@/hooks/useAuth';
import {
    resetPasswordSchema,
    type ResetPasswordInput,
} from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const resetPasswordMutation = useResetPassword();

    const form = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
            otp: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: ResetPasswordInput) => {
        const { confirmPassword: _, ...resetData } = data;
        resetPasswordMutation.mutate(resetData);
    };

    return (
        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 text-center pb-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <KeyRound className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Reset password
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Enter the code sent to your email and your new password
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            className="h-11 border-input/50 bg-background/50 focus:border-primary focus:ring-primary"
                                            disabled={resetPasswordMutation.isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Reset Code
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter 6-digit code"
                                            className="h-11 border-input/50 bg-background/50 focus:border-primary focus:ring-primary tracking-widest text-center font-mono"
                                            disabled={resetPasswordMutation.isPending}
                                            maxLength={6}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your new password"
                                                autoComplete="new-password"
                                                className="h-11 pr-10 border-input/50 bg-background/50 focus:border-primary focus:ring-primary"
                                                disabled={resetPasswordMutation.isPending}
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Confirm New Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            className="h-11 border-input/50 bg-background/50 focus:border-primary focus:ring-primary"
                                            disabled={resetPasswordMutation.isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-11 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all"
                            disabled={resetPasswordMutation.isPending}
                        >
                            {resetPasswordMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                'Reset password'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col pt-2 pb-6">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                </Link>
            </CardFooter>
        </Card>
    );
}
