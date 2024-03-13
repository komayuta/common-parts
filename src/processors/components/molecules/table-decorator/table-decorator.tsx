import {ICustomContainerProps} from "@syginc/aomjs";
import classNames from "classnames";
import {styled} from "linaria/react";
import {useEffect, useRef, useState} from "react";

import {tableDecoratorNoteZindex} from "../../../styles/common-variables";
import {useClosableContainer} from "../closable-container/closable-container";

const noteSVG = `<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 0.749023L4.83333 5.74902L0.5 10.749" stroke="#555555" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M5.83337 0.749023L10.1667 5.74902L5.83337 10.749" stroke="#555555" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M11.1666 0.749023L15.5 5.74902L11.1666 10.749" stroke="#555555" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
`;

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 80px;
    &.shortened {
        table > tbody > tr:nth-child(n + 11) {
            display: none;
        }
    }
`;

const WrapperDiv = styled.div<{shortened: boolean; maxHeight: string}>`
    overflow: auto;
    grid-area: 1/1/2/3;
`;

const NoteDiv = styled.div<{show: boolean}>`
    display: ${(props) => (props.show ? "flex" : "none")};
    position: relative;
    z-index: ${tableDecoratorNoteZindex};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    grid-area: 1/2/2/3;
`;

const NoteSection = styled.section`
    width: 50px;
    height: 26px;
    background: white;
    text-align: center;
    font-weight: 300;
    font-size: 10px;
    line-height: 1.25;
`;

const NoteIcon = styled.div`
    width: 17px;
    height: 12px;
    background-image: url("data:image/svg+xml;utf8,${encodeURIComponent(noteSVG)}");
`;
export function TableDecorator(props: ICustomContainerProps) {
    const {children, data} = props;
    const {open} = useClosableContainer();
    const [noteShow, setNoteShow] = useState(true);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = divRef.current;
        if (!div) {
            return;
        }

        const updateNoteStatus = () => {
            setNoteShow(noteShow && div.clientWidth < div.scrollWidth && div.scrollLeft === 0);
        };

        updateNoteStatus();
        div.addEventListener("scroll", updateNoteStatus);
        return () => div.removeEventListener("scroll", updateNoteStatus);
    }, [noteShow]);

    return (
        <StyledDiv className={classNames({["shortened"]: !open})} {...data}>
            <NoteDiv show={noteShow}>
                <NoteSection>
                    スクロール
                    <br />
                    できます
                </NoteSection>
                <NoteIcon />
            </NoteDiv>
            <WrapperDiv className="wrapper" shortened={!open} maxHeight={"500px"} ref={divRef}>
                {children}
            </WrapperDiv>
        </StyledDiv>
    );
}
