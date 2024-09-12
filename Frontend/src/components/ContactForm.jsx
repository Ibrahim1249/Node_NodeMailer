
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (data) => {
    console.log(data)
    try{
      setIsSubmitting(true);
      const response = await axios.post("https://localhost:6969/mail", data);
      if (response.status === 200 && response.data === "OK") {
        console.log(response)
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
        })
        setIsSubmitting(false)
        reset()
      }

    }catch(error){
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
      setIsSubmitting(false)
    }

  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-fade-in-down">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Node Mailer</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="animate-fade-in-up">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</Label>
            <Input
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
              placeholder="Enter your name"
              {...register("name", { 
                required: "Name is required", 
                minLength: { value: 2, message: "Name must be at least 2 characters long" } 
              })} />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1 flex items-center animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="animate-fade-in-up">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
              placeholder="Enter your email"
              {...register("email", { 
                required: "Email is required", 
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                  message: "Please enter a valid email address" 
                } 
              })} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1 flex items-center animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="animate-fade-in-up">
            <Label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1">Message</Label>
            <Textarea
              id="message"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 min-h-[100px]"
              placeholder="Enter your message here"
              {...register("message", { 
                required: "Message is required", 
                minLength: { value: 10, message: "Message must be at least 10 characters long" } 
              })} />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1 flex items-center animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          <div
            className="transition duration-300 ease-in-out transform hover:scale-102 active:scale-98">
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </form>
      </div>
    </div>)
  );
}