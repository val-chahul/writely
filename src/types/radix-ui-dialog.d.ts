declare module '@radix-ui/react-dialog' {
  import * as React from 'react';

  interface DialogProps extends React.PropsWithChildren {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
  }

  interface DialogContentProps extends React.ComponentPropsWithoutRef<'div'> {
    onOpenAutoFocus?: (event: Event) => void;
    onCloseAutoFocus?: (event: Event) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: PointerEvent) => void;
    onInteractOutside?: (event: Event) => void;
    forceMount?: boolean;
  }

  interface DialogPortalProps extends React.PropsWithChildren {
    forceMount?: boolean;
    container?: HTMLElement;
  }

  interface DialogOverlayProps extends React.ComponentPropsWithoutRef<'div'> {
    forceMount?: boolean;
  }

  interface DialogTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
    asChild?: boolean;
  }

  interface DialogTitleProps extends React.ComponentPropsWithoutRef<'h2'> {
    asChild?: boolean;
  }

  interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<'p'> {
    asChild?: boolean;
  }

  interface DialogCloseProps extends React.ComponentPropsWithoutRef<'button'> {
    asChild?: boolean;
  }

  const Root: React.FC<DialogProps>;
  const Trigger: React.FC<DialogTriggerProps>;
  const Portal: React.FC<DialogPortalProps>;
  const Overlay: React.ForwardRefExoticComponent<
    DialogOverlayProps & React.RefAttributes<HTMLDivElement>
  >;
  const Content: React.ForwardRefExoticComponent<
    DialogContentProps & React.RefAttributes<HTMLDivElement>
  >;
  const Title: React.ForwardRefExoticComponent<
    DialogTitleProps & React.RefAttributes<HTMLHeadingElement>
  >;
  const Description: React.ForwardRefExoticComponent<
    DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>
  >;
  const Close: React.ForwardRefExoticComponent<
    DialogCloseProps & React.RefAttributes<HTMLButtonElement>
  >;

  export { Root, Trigger, Portal, Overlay, Content, Title, Description, Close };
}
