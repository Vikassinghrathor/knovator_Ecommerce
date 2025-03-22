
import { useState } from "react";
import { UserDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutFormProps {
  onSubmit: (userDetails: UserDetails) => void;
  isSubmitting: boolean;
}

const CheckoutForm = ({ onSubmit, isSubmitting }: CheckoutFormProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    address: ""
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};
    
    if (!userDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!userDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!userDetails.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof UserDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(userDetails);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-medium">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className={errors.firstName ? "text-destructive" : ""}>
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={userDetails.firstName}
            onChange={handleChange}
            className={errors.firstName ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p className="text-destructive text-xs">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className={errors.lastName ? "text-destructive" : ""}>
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={userDetails.lastName}
            onChange={handleChange}
            className={errors.lastName ? "border-destructive" : ""}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-destructive text-xs">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>
          Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          placeholder="Enter your full address"
          value={userDetails.address}
          onChange={handleChange}
          className={errors.address ? "border-destructive" : ""}
          disabled={isSubmitting}
        />
        {errors.address && (
          <p className="text-destructive text-xs">{errors.address}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <span>Place Order</span>
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;
