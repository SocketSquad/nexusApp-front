import React, { useState } from 'react';
import { UserPlus, AlertCircle, Mail, Shield } from 'lucide-react';

interface AddMemberFormProps {
    onSubmit: (data: { email: string; role: 'admin' | 'member' }) => void;
    onClose: () => void;
}

export default function AddMemberForm({ onSubmit, onClose }: AddMemberFormProps) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'admin' | 'member'>('member');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!email) {
            setError('Email is required');
            setIsSubmitting(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }

        try {
            await onSubmit({ email, role });
        } catch (err) {
            setError('Failed to add member. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="space-y-4">
                <div className="space-y-4 mt-4">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400 dark:text-white" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`
                                    w-full pl-10 pr-4 py-2.5 
                                    border rounded-lg border-slate-300 dark:border-slate-700
                                    bg-white dark:bg-slate-800
                                    transition duration-150 ease-in-out
                                    focus:outline-none focus:ring-2 
                                    ${error ?
                                    'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' :
                                    'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }
                                `}
                                placeholder="member@example.com"
                                aria-invalid={error ? 'true' : 'false'}
                                aria-describedby={error ? 'email-error' : undefined}
                                disabled={isSubmitting}
                            />
                        </div>
                        {error && (
                            <div className="mt-2 flex items-center gap-1.5 text-red-600" id="email-error">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5"
                        >
                            Member Role
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Shield className="h-5 w-5 text-slate-400 dark:text-white" />
                            </div>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'admin' | 'member')}
                                className="
                                    w-full pl-10 pr-4 py-2.5
                                    border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800
                                    appearance-none
                                    transition duration-150 ease-in-out
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    disabled:bg-slate-50 disabled:text-slate-500"
                                disabled={isSubmitting}>
                                <option value="member">Regular Member</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-1.5 text-sm text-success">
                            {role === 'admin' ?
                                'Administrators can manage members and group settings' :
                                'Regular members can participate in group discussions'
                            }
                        </p>
                    </div>
                </div>
            </div>


            <div className="h-px w-full border-b border-white-light dark:border-slate-700 mt-4"></div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="
            flex-1 px-4 py-2.5
            border border-slate-300 dark:border-slate-700
            text-slate-900 dark:text-white font-medium
            rounded-lg 
            hover:bg-slate-50 dark:hover:bg-slate-700 
            focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2
            transition-colors
            disabled:opacity-50
          "
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="
            flex-1 px-4 py-2.5
            bg-gradient-to-r from-primary to-purple-500
            text-white font-semibold
            rounded-lg 
            hover:bg-gradient-to-r hover:from-primary-dark hover:to-purple-600
            transition-colors
            disabled:opacity-50
            flex items-center justify-center gap-2
          "
                    disabled={isSubmitting}
                >
                    <UserPlus className="w-4 h-4" />
                    {isSubmitting ? 'Adding...' : 'Add Member'}
                </button>
            </div>
        </form>
    );
}