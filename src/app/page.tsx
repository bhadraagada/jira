import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex ">
      <Button variant={'primary'}>Buttocasn primary</Button>
      <Button variant={'secondary'}>Button secondary </Button>
      <Button variant={'ghost'}>Button ghost </Button>
      <Button variant={'muted'}>Button muted</Button>
      <Button variant={'outline'}>Button outline</Button>
      <Button variant={'destructive'}>Button destructive</Button>
      <Button variant={'teritary'}>Button teritary</Button>
    </div>
  );
}
