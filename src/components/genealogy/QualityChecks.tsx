
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface QualityChecksProps {
  lotId: string;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  lotId: z.string().min(1, "Lot ID is required"),
  checkType: z.string().min(1, "Check type is required"),
  result: z.string().min(1, "Result is required"),
  notes: z.string().optional(),
});

const QualityChecks: React.FC<QualityChecksProps> = ({ lotId, onSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lotId: lotId,
      checkType: "",
      result: "",
      notes: "",
    },
  });
  
  React.useEffect(() => {
    form.setValue('lotId', lotId);
  }, [lotId, form]);
  
  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset({
      lotId: lotId,
      checkType: "",
      result: "",
      notes: "",
    });
  }
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="lotId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lot ID</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>
                  The ID of the lot being checked
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="checkType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a check type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="visual">Visual Inspection</SelectItem>
                    <SelectItem value="dimensional">Dimensional Check</SelectItem>
                    <SelectItem value="functional">Functional Test</SelectItem>
                    <SelectItem value="material">Material Analysis</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Result</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a result" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any additional notes about the quality check"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            disabled={!lotId}
            className="w-full"
          >
            Submit Quality Check
          </Button>
        </form>
      </Form>
      
      {!lotId && (
        <div className="text-center p-4 text-gray-500">
          Select a lot to add quality check data
        </div>
      )}
    </div>
  );
};

export default QualityChecks;
