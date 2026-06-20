"use client";
interface AlertProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
}
const typeMap: Record<string, string> = {
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
};
export const Alert = ({ type = 'error', children }: AlertProps) => (
  <div className={`p-3 rounded-md ${typeMap[type]} transition-colors`}> {children} </div>
);
