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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema, type LoginInput } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = (data: LoginInput) => {
        loginMutation.mutate(data);
    };

    return (
        <Card className="w-full max-w-md border-none bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 text-center pb-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 1024 1000"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                    >
                        <path
                            d="M511.999 0C511.999 0 557.152 250.92 662.105 353.413C767.058 455.907 1024 500.001 1024 500.001C1024 500.001 767.058 544.096 662.105 646.587C557.152 749.08 511.999 1000 511.999 1000C511.999 1000 466.849 749.08 361.896 646.587C256.942 544.096 0 500.001 0 500.001C0 500.001 256.942 455.907 361.896 353.413C466.849 250.92 511.999 0 511.999 0Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Sign in to your account to continue
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
                                            disabled={loginMutation.isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                autoComplete="current-password"
                                                className="h-11 pr-10 border-input/50 bg-background/50 focus:border-primary focus:ring-primary"
                                                disabled={loginMutation.isPending}
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

                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="remember"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="border-input/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                            />
                                        </FormControl>
                                        <label
                                            htmlFor="remember"
                                            className="text-sm text-muted-foreground cursor-pointer select-none"
                                        >
                                            Remember me
                                        </label>
                                    </FormItem>
                                )}
                            />
                            <Link
                                href="/forgot-password"
                                className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col pt-2 pb-6">
                <div className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
