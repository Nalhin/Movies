import { act, renderHook } from '@testing-library/react-hooks';
import { useToggle } from './use-toggle';

describe('useToggle()', () => {
  it('should return false by default', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current.isOpen).toBeFalse();
  });

  it('should return default state', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current.isOpen).toBeTrue();
  });

  it('should change state when toggle is called', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.isOpen).toBeTrue();

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBeTrue();
  });

  it('should return true when open', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBeTrue();
  });

  it('should return false when closed', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBeFalse();
  });
});
