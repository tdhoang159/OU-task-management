import React, { use, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ArrowLeft, CheckCircle, Loader, XCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useVeryfyEmailMutation } from "~/hooks/use-auth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVeryfyEmailMutation();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMassage =
              error.response?.data?.message || "Email verification failed";
            setIsSuccess(false);
            console.log(error);
            toast.error(errorMassage);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500">Verifying your email...</p>

      <Card className="w-full max-w-md">
        {/* <CardHeader>
          <Link className="flex items-center gap-2 text-sm" to="/sign-in">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                <h3 className="text-lg font-semibold">Verifying email...</h3>
                <p className="text-gray-500 text-sm">
                  Please wait while we verify your email
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-10 w-10 text-green-500" />
                <h3 className="text-lg font-semibold">Email verified</h3>
                <p className="text-sm text-gray-500">
                  Your email has been verified successfully
                </p>
                <Link className="text-sm text-blue-500 mt-6" to="/sign-in">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircle className="h-10 w-10 text-red-500" />
                <h3 className="text-lg font-semibold">Email verified Failed</h3>
                <p className="text-sm text-gray-500">
                  Your email verification failed. Please try again.
                </p>

                <Link className="text-sm text-blue-500 mt-6" to="/sign-in">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;