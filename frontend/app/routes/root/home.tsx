import React from 'react'
import type { Route } from '../../+types/root';
import { Button } from '~/components/ui/button';



export function meta({}: Route.MetaArgs) {
  return [
    { title: "OU Task Management" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const HomePage = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Button className='b'>Click me</Button>
    </div>
    
  )
}

export default HomePage