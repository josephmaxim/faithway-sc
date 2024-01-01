import { useToaster, Notification } from 'rsuite';

export const notify = ({ header, message, type }) => {
  const toaster = useToaster();
  return toaster.push(
    <Notification type={type} header={header} closable>
      { message }
    </Notification>,
    {
      placement: 'bottomEnd'
    }
  )
}