import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { selectContextMenuLocation, setContextMenuLocation } from "../stores/interfaceStore";
import useKeypress from "../utils/hooks";

const CONTEXT_MENU_WIDTH = 220

let items = [];
// redux can't store functions
export const setItems = (itemList) => {
    items = itemList;
}

const ContextMenuWrapper = () => {
    //const items = useSelector(selectContextMenuItems);
    const {x: clickX, y: clickY} = useSelector(selectContextMenuLocation);
    const [animation, setAnimation] = useState("left-top");
    const [reallyHidden, setReallyHidden] = useState(true);
    const [unhidden, setUnhidden] = useState(false);
    const [hidden, setHidden] = useState(true);

    const dispatch = useDispatch();

    const close = () => {
        setHidden(true);
        setUnhidden(false);
    }

    useKeypress('Escape', () => {
        close();
    });

    useEffect( () => {
        if(!items.length) {
            if(!hidden) setHidden(true);
            return;
        }
        const height = items.length * 64
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const clientWidth = document.querySelector("#App").clientWidth
        const clientHeight = document.querySelector("#App").clientHeight
        let x = clickX;
        let y = clickY;
        x -= (windowWidth - clientWidth) / 2;
        y -= (windowHeight - clientHeight) / 2;

        let anim = animation;

        if (x + CONTEXT_MENU_WIDTH >= windowWidth) {
            x = x - CONTEXT_MENU_WIDTH
            anim = "right-top";
        }
        if (y + height >= windowHeight) {
            y = y - height
            if (animation === "right-top") {
                anim = "right-bottom";
            } else {
                anim = "left-bottom";
            }

            if(y <= 0) {
                y = 0
            }
        }

        setAnimation(anim);
        
        dispatch(setContextMenuLocation({x, y}));
        setHidden(false);
        setReallyHidden(false);
        setUnhidden(true);
        
    }, [items]);

    return (
        <div className={classNames({
                "context-menu-wrapper": true,
                "unhidden": unhidden,
                "really-hidden": reallyHidden,
                "hidden": hidden
            })}
            onClick={close}
            onContextMenu={close}
            onAnimationEnd={ev => {if (ev.animationName === "hidden-context") {
                setReallyHidden(true);
                setItems([]);
                }}}>

            <div className={classNames("context-menu", animation)}
                style={{
                    top: clickY + "px",
                    left: clickX + "px"
                }}>
                {items.map((item, i) => {
                            return (
                                <div className={classNames({
                                    "element": true,
                                    "red": item.red
                                    })} 
                                    onClick={event => {
                                        item.onClick?.()
                                        event.stopPropagation()
                                        close();
                                    }}
                                    key={i}>

                                    {item.icon && <i className={`tgico tgico-${item.icon}`}/>}

                                    <span>{item.title}</span>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default ContextMenuWrapper

export const contextMenuListener = (items) => {
    if (items.length === 0) { // empty context menu blocks scroll
        return () => {};
    }
    return event => {
        event.preventDefault();
        //store.dispatch(setContextMenuItems(items));
        setItems(items);
        store.dispatch(setContextMenuLocation({
            x: event.clientX,
            y: event.clientY
        }))
    }
}