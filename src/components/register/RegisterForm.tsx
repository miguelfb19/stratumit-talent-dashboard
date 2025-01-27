'use client'

import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';

export const RegisterForm = () => {

    const OnSubmitForm = (e:React.FormEvent)=>{

        e.preventDefault()

        alert('Submitted')
    }

    // Fields 

    // fisrtName, lastName, email, passqord, confirmationPassword, birthDate, country

  return (
    <div id='form-container' className='flex h-screen w-screen justify-center items-center'>
        <Form onSubmit={OnSubmitForm} style={{width: '50%', padding: '3rem'}} className='w-1/2 m-auto border-2 p-10 rounded-lg'>

            <Input type='text' placeholder='First Name' className='w-full'/>
            <Input type='text' placeholder='Last Name'/>

            <Button type='submit' color='primary' radius='full' variant='flat'>Register</Button>
        </Form>
    </div>
  )
}
