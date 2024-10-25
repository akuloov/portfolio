import {Alert, AlertTitle} from "@mui/material";

const HandleFetchStatus = ({
                             isPaused,
                             textError,
                             className
                           }: {
  isPaused: boolean,
  textError: string,
  className?: string
}) => {
  return (
    <>
      {isPaused &&
          <Alert severity="error" className={className}>
              <AlertTitle>Error</AlertTitle>
            {textError}
          </Alert>}
    </>
  )
}
export default HandleFetchStatus;