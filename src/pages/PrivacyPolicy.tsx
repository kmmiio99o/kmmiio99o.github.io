import React from "react";
import {
  Container,
  Paper,
  Typography,
  Stack,
  useTheme,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Snowfall from "../components/Snowfall";
import SecurityIcon from "@mui/icons-material/Security";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import GavelIcon from "@mui/icons-material/Gavel";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import ArticleIcon from "@mui/icons-material/Article";

const PrivacyPolicy: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{
        py: { xs: 3, sm: 5, md: 6 },
        px: { xs: 2, sm: 3 },
        minHeight: "100vh",
      }}
    >
      <Snowfall
        count={120}
        speed={1}
        wind={0.15}
        color={theme.palette.mode === "dark" ? "#ffffff" : "#f0f4ff"}
        opacity={0.25}
        zIndex={-1}
      />

      {/* Hero Header */}
      <section style={{ marginBottom: "clamp(1.5rem, 4vw, 3rem)" }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 4.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(30, 30, 50, 0.1) 0%, rgba(50, 50, 70, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(8px)",
            textAlign: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: { xs: "180px", sm: "250px" },
              height: { xs: "180px", sm: "250px" },
              background:
                theme.palette.mode === "dark"
                  ? `radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)`
                  : `radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`,
              borderRadius: "50%",
              transform: "translate(40%, -40%)",
            },
          }}
        >
          <Stack spacing={2} alignItems="center">
            <ShieldIcon
              sx={{
                fontSize: { xs: 48, sm: 64 },
                color: theme.palette.primary.main,
                mb: 1,
              }}
            />
            <Typography
              component="h1"
              variant="h2"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3rem" },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={500}
              sx={{
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              RODO/GDPR Compliance • Data Protection • Your Rights
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>
        </Paper>
      </section>

      {/* Main Content */}
      <Stack spacing={{ xs: 3, sm: 4 }}>
        {/* Introduction */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <ArticleIcon color="primary" />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Introduction
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
            >
              This Privacy Policy explains how I handle your personal data in
              compliance with the General Data Protection Regulation (GDPR) and
              Polish data protection law (RODO). I am committed to protecting
              your privacy and being transparent about my practices.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
            >
              My website primarily serves as a portfolio and does not process
              sensitive personal data. However, I believe in full transparency
              regarding any data that may be collected automatically.
            </Typography>
          </Stack>
        </Paper>

        {/* Data Collection Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <PrivacyTipIcon color="primary" />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                What Data I Collect
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                >
                  Automated Data Collection
                </Typography>
                <List dense sx={{ pl: 1 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="IP Address"
                      secondary="For security and analytics purposes (I alone can't have access to it)"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{ variant: "caption" }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Browser Type & Version"
                      secondary="For compatibility optimization and statistics"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{ variant: "caption" }}
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
                >
                  Data I Do NOT Collect
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  I do not collect or store:
                </Typography>
                <List dense sx={{ pl: 1 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <WarningIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Personal Identifiers"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <WarningIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Payment Information"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <WarningIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location Data"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <WarningIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Contact Information"
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        {/* Legal Basis & Rights */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <GavelIcon color="primary" />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Your Rights Under RODO/GDPR
              </Typography>
            </Stack>

            <List>
              <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Right to Access"
                  secondary="You can request information about your personal data I process"
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Right to Rectification"
                  secondary="You can request correction of inaccurate personal data"
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Right to Erasure"
                  secondary="You can request deletion of your personal data"
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Right to Data Portability"
                  secondary="You can receive your data in a structured, commonly used format"
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <CheckCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Right to Object"
                  secondary="You can object to processing of your personal data"
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            </List>
          </Stack>
        </Paper>

        {/* Security Measures */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <LockIcon color="primary" />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                Security Measures
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
              >
                I implement appropriate technical and organizational measures to
                ensure a level of security appropriate to the risk, including:
              </Typography>

              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <SecurityIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="HTTPS encryption for all data transmission"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <SecurityIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Regular security updates and audits"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <SecurityIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Data minimization principles"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              </List>
            </Stack>
          </Stack>
        </Paper>

        {/* Additional Information */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 2,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(40, 40, 60, 0.1) 0%, rgba(60, 60, 80, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(240, 245, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
            >
              Additional Information
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.9375rem" } }}
              >
                <strong>Data Retention:</strong> I retain automatically
                collected data (IP addresses, browser info) only for as long as
                is necessary.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.9375rem" } }}
              >
                <strong>Third-Party Services:</strong> This website does not use
                third-party services for data processing.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.9375rem" } }}
              >
                <strong>Cookies:</strong> My website uses only essential cookies
                required for website functionality. No tracking or marketing
                cookies are used.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.875rem", sm: "0.9375rem" } }}
              >
                <strong>Supervisory Authority:</strong> If you believe I have
                violated data protection laws, you have the right to file a
                complaint with the Polish supervisory authority (UODO) or your
                local data protection authority.
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Footer Note */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.8125rem" },
              display: "block",
              mb: 1,
            }}
          >
            This Privacy Policy is compliant with Regulation (EU) 2016/679
            (GDPR) and Polish Act of 10 May 2018 on Personal Data Protection
            (RODO).
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" }, opacity: 0.8 }}
          >
            This is a sample privacy policy for informational purposes. Consult
            with legal professionals for specific advice.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export const PrivacyLink = {
  name: "Privacy",
  path: "/privacy",
  iconName: "UpdateIcon",
};

export default PrivacyPolicy;
