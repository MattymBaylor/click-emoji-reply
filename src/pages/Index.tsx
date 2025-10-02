import { Button } from "@/components/ui/button";
import { Reply, ReplyAll, Forward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} clicked`,
      description: `You clicked the ${action} button`,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-8 p-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Quick Response Actions</h1>
          <p className="text-xl text-muted-foreground">Gmail-style quick response buttons</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="gap-2 rounded-full px-6"
            onClick={() => handleAction("Reply")}
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          
          <Button
            variant="outline"
            className="gap-2 rounded-full px-6"
            onClick={() => handleAction("Reply all")}
          >
            <ReplyAll className="h-4 w-4" />
            Reply all
          </Button>
          
          <Button
            variant="outline"
            className="gap-2 rounded-full px-6"
            onClick={() => handleAction("Forward")}
          >
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
