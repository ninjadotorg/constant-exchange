import React from "react";
import _ from "lodash";
import { Avatar } from "./Avatar";
import styled from "styled-components";
import { MailIcon, VoteIcon } from "../../components/svg";
import numeral from "numeral";

const renderIf = condition => component => (condition ? component : null);

function getFullName(user) {
  return `${_.get(user, "FirstName")} ${_.get(user, "LastName")}`;
}

const TokenImage = ({ width, height, src }) => {
  const [isError, setIsError] = React.useState(false);
  React.useEffect(() => {
    setIsError(false);
  }, [src]);

  return isError ? (
    <div style={{ display: "inline-block", width, height }} />
  ) : (
    <img
      alt="."
      width={width}
      height={height}
      src={src}
      onError={e => {
        setIsError(true);
      }}
    />
  );
};

export function RightContent({ applicant = {}, onClickVote }) {
  const user = _.get(applicant, "User", {});
  const balances = Object.values(_.get(applicant, "Balances.ListBalances", {}));

  return (
    <div className="col-12 col-lg-3">
      <div className="c-card">
        {renderIf(_.isEmpty(applicant))(
          <div className="empty">Please select applicant</div>
        )}
        {renderIf(!_.isEmpty(applicant))(
          <div className="right-bar">
            <AvatarAndName>
              <Avatar>{_.get(user, "FirstName.0", "").toUpperCase()}</Avatar>
              <Name>{getFullName(user)}</Name>
            </AvatarAndName>
            <Div1>
              <Line>
                <IconWrapper>
                  <MailIcon />
                </IconWrapper>
                <Text>{_.get(user, "Email")}</Text>
              </Line>
              <Line>
                <IconWrapper>
                  <VoteIcon />
                </IconWrapper>
                <Text>{_.get(applicant, "VoteNum")} votes</Text>
              </Line>
            </Div1>

            <Div2>
              <Title>Token list</Title>
              {balances.map((balance, index) => {
                return (
                  <Balance key={index}>
                    <TokenImageWrapper>
                      <TokenImage
                        width={10}
                        height={10}
                        src={balance.TokenImage}
                      />
                    </TokenImageWrapper>
                    <SymbolName>{balance.SymbolName}</SymbolName>
                    <BalanceValue>
                      {numeral(balance.AvailableBalance).format("0,0")}
                    </BalanceValue>
                  </Balance>
                );
              })}
            </Div2>
            <ButtonWrapper>
              <Button
                className="c-btn c-btn-primary"
                type="button"
                onClick={onClickVote}
              >
                Vote this applicant
              </Button>
            </ButtonWrapper>
          </div>
        )}
      </div>
    </div>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  text-transform: none;
  flex: 1;
`;

const Balance = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
`;

const TokenImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
  }
`;

const SymbolName = styled.div`
  flex: 1;
  padding-left: 10px;
  font-size: 14px;
  color: #050c33;
  font-weight: lighter;
`;

const BalanceValue = styled.div`
  text-align: right;
`;

const AvatarAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  color: #050c33;
  font-size: 18px;
  padding-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Div1 = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d8d8d8;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  svg {
    transform: translateY(-4px);
  }
`;

const Text = styled.div`
  padding-left: 10px;
  font-size: 14px;
  color: #050c33;
  font-weight: lighter;
`;

const Div2 = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Title = styled.div`
  font-size: 14px;
  color: #050c33;
  font-weight: lighter;
  margin-bottom: 20px;
`;
