import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface PopupNotificationProps {
  title: string;
  body: string;
  visible: boolean;
  onClose: () => void;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({
  title,
  body,
  visible,
  onClose,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // 애니메이션 상태

  useEffect(() => {
    if (visible) {
      // 팝업 보이기 (페이드 인)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // 3초 후 자동으로 닫기
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer); // 클린업
    }
  }, [visible]);

  const handleClose = () => {
    // 팝업 숨기기 (페이드 아웃)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose(); // 부모 컴포넌트로 닫힘 알림
    });
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.popup}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    padding: 15,
    width: "80%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  body: {
    color: "white",
    fontSize: 14,
  },
});

export default PopupNotification;
