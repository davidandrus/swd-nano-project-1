import React, { PropTypes } from 'react';

const dateTimeWrapperStyle = {
  maxWidth: '100%',
  justifyContent: 'space-between',
};

const datePickerStyle = {
  flex: '0 0 48%',
};

const timePickerStyle = {
  flex: '0 0 48%',
};

const dateTimeWrapperCSS = `
  .date-time-wrapper {
    dispay: 'block';
  }

  @media only screen and (min-width: 640px)  {
    .date-time-wrapper {
      display: flex;
    }
  }
`;

export default function DateTime({ date, time, style }) {
  return (
    <div>
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: dateTimeWrapperCSS,
        }}
      />
      <div
        className="date-time-wrapper"
        style={{
          ...dateTimeWrapperStyle,
          ...style,
        }}
      >
        <div style={datePickerStyle}>
          {date}
        </div>
        <div style={timePickerStyle}>
          {time}
        </div>
      </div>
    </div>
  );
}

DateTime.propTypes = {
  date: PropTypes.node,
  time: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};
