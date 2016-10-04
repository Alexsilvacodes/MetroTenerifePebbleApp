AR = 'arm-none-eabi-ar'
ARFLAGS = 'rcs'
AS = 'arm-none-eabi-gcc'
BINDIR = '/usr/local/bin'
BLOCK_MESSAGE_KEYS = []
BUILD_DIR = 'aplite'
BUILD_TYPE = 'app'
BUNDLE_BIN_DIR = 'aplite'
BUNDLE_NAME = 'PebbleTramTF.pbw'
CC = ['arm-none-eabi-gcc']
CCLNK_SRC_F = []
CCLNK_TGT_F = ['-o']
CC_NAME = 'gcc'
CC_SRC_F = []
CC_TGT_F = ['-c', '-o']
CC_VERSION = ('4', '7', '2')
CFLAGS = ['-mcpu=cortex-m3', '-mthumb', '-ffunction-sections', '-fdata-sections', '-g', '-fPIE', '-Os', '-D_TIME_H_', '-Wall', '-Wextra', '-Werror', '-Wno-unused-parameter', '-Wno-error=unused-function', '-Wno-error=unused-variable', '-std=c11', '-fms-extensions', '-Wno-address', '-Wno-type-limits', '-Wno-missing-field-initializers']
CFLAGS_MACBUNDLE = ['-fPIC']
CFLAGS_cshlib = ['-fPIC']
CPPPATH_ST = '-I%s'
DEFINES = ['RELEASE', 'PBL_PLATFORM_APLITE', 'PBL_BW', 'PBL_RECT', 'PBL_COMPASS', 'PBL_DISPLAY_WIDTH=144', 'PBL_DISPLAY_HEIGHT=168', 'PBL_SDK_3']
DEFINES_ST = '-D%s'
DEST_BINFMT = 'elf'
DEST_CPU = 'arm'
DEST_OS = 'darwin'
INCLUDES = ['aplite']
LD = 'arm-none-eabi-ld'
LIBDIR = '/usr/local/lib'
LIBPATH_ST = '-L%s'
LIB_DIR = 'node_modules'
LIB_ST = '-l%s'
LINKFLAGS = ['-mcpu=cortex-m3', '-mthumb', '-Wl,--gc-sections', '-Wl,--warn-common', '-fPIE', '-Os']
LINKFLAGS_MACBUNDLE = ['-bundle', '-undefined', 'dynamic_lookup']
LINKFLAGS_cshlib = ['-shared']
LINKFLAGS_cstlib = ['-Wl,-Bstatic']
LINK_CC = ['arm-none-eabi-gcc']
MESSAGE_KEYS = {}
MESSAGE_KEYS_HEADER = '/Users/Alex/MEGAsync/Proyectos/PebbleTramTF/build/include/message_keys.auto.h'
NODE_PATH = '/Users/Alex/Library/Application Support/Pebble SDK/SDKs/current/node_modules'
PEBBLE_SDK_COMMON = '/Users/Alex/Library/Application Support/Pebble SDK/SDKs/current/sdk-core/pebble/common'
PEBBLE_SDK_PLATFORM = '/Users/Alex/Library/Application Support/Pebble SDK/SDKs/current/sdk-core/pebble/aplite'
PEBBLE_SDK_ROOT = '/Users/Alex/Library/Application Support/Pebble SDK/SDKs/current/sdk-core/pebble'
PLATFORM = {'TAGS': ['aplite', 'bw', 'rect', 'compass', '144w', '168h'], 'ADDITIONAL_TEXT_LINES_FOR_PEBBLE_H': [], 'MAX_APP_BINARY_SIZE': 65536, 'MAX_RESOURCES_SIZE': 524288, 'MAX_APP_MEMORY_SIZE': 24576, 'MAX_WORKER_MEMORY_SIZE': 10240, 'NAME': 'aplite', 'BUNDLE_BIN_DIR': 'aplite', 'BUILD_DIR': 'aplite', 'MAX_RESOURCES_SIZE_APPSTORE_2_X': 98304, 'MAX_RESOURCES_SIZE_APPSTORE': 131072, 'DEFINES': ['PBL_PLATFORM_APLITE', 'PBL_BW', 'PBL_RECT', 'PBL_COMPASS', 'PBL_DISPLAY_WIDTH=144', 'PBL_DISPLAY_HEIGHT=168']}
PLATFORM_NAME = 'aplite'
PREFIX = '/usr/local'
PROJECT_INFO = {u'sdkVersion': u'3', u'uuid': u'dc46f3d5-7e7c-4164-98e4-70989d5d0ac5', u'appKeys': {}, u'companyName': u'Alex Silva', 'messageKeys': {}, u'targetPlatforms': [u'aplite', u'basalt', u'chalk'], u'capabilities': [u''], u'versionLabel': u'1.0', u'longName': u'Metro Tenerife', u'versionCode': 1, u'shortName': u'Metro Tenerife', u'watchapp': {u'hiddenApp': False, u'watchface': False}, u'resources': {u'media': [{u'type': u'png', u'name': u'IMAGE_LOGO_METRO', u'file': u'images/logo_metro.png'}, {u'type': u'png', u'name': u'IMAGE_ICON_STAR', u'file': u'images/pebble_star.png'}, {u'type': u'png', u'name': u'IMAGE_ICON_DISMISS', u'file': u'images/icon_dismiss.png'}, {u'type': u'bitmap', u'name': u'IMAGE_TILE_SPLASH', u'file': u'images/tile_splash.png'}, {u'type': u'font', u'name': u'MONO_FONT_14', u'file': u'fonts/UbuntuMono-Regular.ttf'}]}}
REQUESTED_PLATFORMS = [u'aplite', u'basalt', u'chalk']
RESOURCES_JSON = [{u'type': u'png', u'name': u'IMAGE_LOGO_METRO', u'file': u'images/logo_metro.png'}, {u'type': u'png', u'name': u'IMAGE_ICON_STAR', u'file': u'images/pebble_star.png'}, {u'type': u'png', u'name': u'IMAGE_ICON_DISMISS', u'file': u'images/icon_dismiss.png'}, {u'type': u'bitmap', u'name': u'IMAGE_TILE_SPLASH', u'file': u'images/tile_splash.png'}, {u'type': u'font', u'name': u'MONO_FONT_14', u'file': u'fonts/UbuntuMono-Regular.ttf'}]
RPATH_ST = '-Wl,-rpath,%s'
SDK_VERSION_MAJOR = 5
SDK_VERSION_MINOR = 78
SHLIB_MARKER = None
SIZE = 'arm-none-eabi-size'
SONAME_ST = '-Wl,-h,%s'
STLIBPATH_ST = '-L%s'
STLIB_MARKER = None
STLIB_ST = '-l%s'
SUPPORTED_PLATFORMS = ['aplite', 'basalt', 'chalk', 'diorite']
TARGET_PLATFORMS = ['chalk', 'basalt', 'aplite']
TIMESTAMP = 1475604515
USE_GROUPS = True
cprogram_PATTERN = '%s'
cshlib_PATTERN = 'lib%s.so'
cstlib_PATTERN = 'lib%s.a'
macbundle_PATTERN = '%s.bundle'