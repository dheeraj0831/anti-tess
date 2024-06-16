import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
    return (
        <div className=' px-4 py-4 flex items-center justify-between w-full bottom-0 fixed'>
            <p className='text-xl font-bold'>Created By:</p>
            <div className='flex items-center gap-16'>
                <Button variant="link" className="text-white"><a href="https://github.com/Sanjay-2004">Sanjay Agamamidi</a></Button>
                <Button variant="link" className="text-white"><a href="https://github.com/dheeraj0831">B Dheeraj Kumar Reddy</a></Button>
            </div>
        </div>
    );
};

export default Footer;
