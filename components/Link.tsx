import { useRouter } from "next/router";
import NextLink from "next/link";
import { FunctionComponent } from "react";

interface RenderFunctionProps extends Partial<LinkProps> {
  content?: React.ReactNode;
  isActive: boolean;
}

type RenderFunction = (props: RenderFunctionProps) => React.ReactElement;

const defaultRenderFn: RenderFunction = ({ content, isActive, ...rest }) => (
  <a className={isActive ? "isActive" : ""} {...rest}>
    {content}
  </a>
);

interface LinkProps {
  to?: string;
  as?: string;
  href?: string;
  target?: string;
  children: React.ReactNode | RenderFunction;
}

/**
 * This component renders either a NextLink or an <a> element, depending on props passed
 * Pass `to` to render a NextLink to navigate inside the application
 * Pass `href` to render a normal <a> element
 * The rendered element can be customized using function as a child component
 */
const Link: FunctionComponent<LinkProps> = (props) => {
  const { href, to, as, target, children } = props;
  const router = useRouter();
  const isActive = to && to !== "/" ? router.asPath.includes(to) : false;
  let renderFn: RenderFunction;
  let content: string = "";

  if (typeof children === "function") {
    renderFn = children as RenderFunction;
  } else {
    content = children as string;
    renderFn = defaultRenderFn;
  }

  if (to) {
    return (
      <NextLink href={to} as={as}>
        {renderFn({ href: to, content, isActive, target })}
      </NextLink>
    );
  } else {
    return renderFn({ href, content, isActive, target });
  }
};

export default Link;
