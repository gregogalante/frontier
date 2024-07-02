#![cfg_attr(not(feature = "std"), no_std, no_main)]

use ink::primitives::AccountId;



#[ink::scale_derive(Encode)]
enum RuntimeCall {
    #[codec(index = 10)]
    Custom(CustomCall),
}

#[ink::scale_derive(Encode)]
enum CustomCall {
    #[codec(index = 0)]
    extrinsic {
        number: u64
    },
}

#[ink::contract]
mod runtime_call {
    use crate::{
        CustomCall,
        RuntimeCall,
    };

    use ink::env::Error as EnvError;



    #[ink(storage)]
    #[derive(Default)]
    pub struct RuntimeCaller {
        stored_number: u64,
    }

    #[derive(Debug, PartialEq, Eq)]
    #[ink::scale_derive(Encode, Decode, TypeInfo)]
    pub enum RuntimeError {
        CallRuntimeFailed,
    }

    impl From<EnvError> for RuntimeError {
        fn from(e: EnvError) -> Self {
            use ink::env::ReturnErrorCode;
            match e {
                EnvError::ReturnError(ReturnErrorCode::CallRuntimeFailed) => {
                    RuntimeError::CallRuntimeFailed
                }
                _ => panic!("Unexpected error from `pallet-contracts`."),
            }
        }
    }

    impl RuntimeCaller {
  
        #[ink(constructor, payable)]
        pub fn new() -> Self {
            Self { stored_number: 0 }
        }


        #[ink(message)]
        pub fn extrinsic_caller(
            &mut self,
            number: u64,
        ) -> Result<(), RuntimeError> {
            self.env()
                .call_runtime(&RuntimeCall::Custom(CustomCall::extrinsic { number }))
                .map_err(Into::into)
        }

        //function used from offchain worker to save the data after the extrinsic call
        #[ink(message)]
        pub fn save_number(&mut self, number: u64) {
            self.stored_number = number;
        }

        //function to get the saved number
        #[ink(message)]
        pub fn get_number(&self) -> u64 {
            self.stored_number
        }
        
    }

    
}